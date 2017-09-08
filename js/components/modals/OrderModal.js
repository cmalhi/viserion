import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, Button, StyleSheet, TextInput, Platform, Easing } from 'react-native';
import SequencedList from '../utils/SequencedList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPrefs } from '../../actions/index';
const io = require('socket.io-client');

var {
  height: deviceHeight
} = Dimensions.get('window');

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      // order: this.props.order,
      currentOrder: null,
      data: null,
      sitePreferences: null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
  }

  /*
   * getObj()
   * Input:
   *  - objArr [ {1: 'hi', 2: 'bye}, {1: 'hello} ]
   *  - key: 1
   *  - value: 'hi'
   * Output:
   *  - {1: 'hi', 2: 'bye'}
   */
  getObj = (objArr, key, value) => {
    for (var i = 0; i < objArr.length; i++) {
      if (objArr[i][key] && objArr[i][key] === value) {
        return objArr[i]
      }
    }
    return false;
  };

  onChangeOrder(orderData) {
    const socket = io(global.HOST, { transports: ['websocket'] });
    this.setState({ currentOrder: orderData });

    // Example

    // orderData: ["TextContent", "Hero", "Footer"]

    // sitePreferences = {
    // components: [
    //   {
    //     componentName: 'Hero',
    //     attr: { title: 'Hello' },
    //   },
    //   {
    //     componentName: 'TextContent',
    //     attr: { title: 'title', body: 'goodbye' },
    //   },
    //   {
    //     componentName: 'Footer',
    //     attr: { title: 'Hello' },
    //   },
    // ]
    // }

    var sitePref = { components: [] };
    orderData.forEach((name) => {
      var objArr = this.state.sitePreferences['components'];
      sitePref.components.push(this.getObj(objArr, 'componentName', name))
    });
    this.setState({sitePreferences : sitePref});
  }

  componentWillMount() {
    // TODO: make a GET request to sitePreferences

    // assume sitePreferences of shape
    /*
     * sitePreferences = {
     *  components: [
     *    { nickName: '', componentName: '', attr: {} }
     *  ]
     * }
     */
    // const exampleSitePreferences = {
    //   components: [
    //     {
    //       componentName: 'Hero',
    //       attr: { title: 'Hello' },
    //     },
    //     {
    //       componentName: 'TextContent',
    //       attr: { title: 'title', body: 'goodbye' },
    //     },
    //     {
    //       componentName: 'Footer',
    //       attr: { title: 'Hello' },
    //     },
    //   ]
    // };
    console.log('this.props.preferences >> ', this.props.preferences);
    let exampleSitePreferences = { components: this.props.preferences };
    this.setState({ sitePreferences: exampleSitePreferences });
    // console.log('this.props.preferences order modal >> ', this.props.preferences);

    /*
     * SortableList requires data of this shape :
     * {
     *  componentName1: { componentName: 'TextContent' },
     *  componentName2: { componentName: 'Footer' }
     * }
     */
    let newObj = {};
    exampleSitePreferences.components.map((c) => {
      newObj[c.componentName] = { componentName: c.componentName }
    });
    this.setState({ data: newObj });
  }

  componentDidMount() {
    //TODO: Get original order from redux preferenecs storage
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0,
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight,
    }).start(this.props.closeModal);
  }

  closeAndUpdate() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    this.closeModal();
    console.log('orderModal this.props.appendPrefs > >', this.props.setPrefs(this.state.sitePreferences.components));

    socket.emit('newPref', this.state.sitePreferences);
  }

  render() {
    return(
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.center}>Close menu</Text>
          </TouchableOpacity>
          <Text style={styles.bigText}>Rearrange Components</Text>
          <SequencedList data={this.state.data} onChangeOrder={this.onChangeOrder} />
          <View style={styles.options}>
            <Button onPress={this.closeAndUpdate} title="Update" />
          </View>
        </View>
      </Animated.View>
    )
  }
}

export const styles = StyleSheet.create({
  form: {
    padding: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  flexContainer: {
    flex: 1,
  },
  webView: {
    padding: 10,
    width: '100%'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
  },
  innerModal:{
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    position: 'relative',
    top: '5%',
    borderRadius: 10,
    height: '80%',
  },
  bigText:{
    fontSize: 20,
  },
  options:{
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

function mapStateToProps({ preferences }) {
  return { preferences };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPrefs }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderModal);