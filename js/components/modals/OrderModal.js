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

/*
 * Notes:
 *  - OrderModal is special because unlike other components, it needs to keep
 *  track of the current sitePreferences of shape [{component1}, {component2}].
 */

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      // currentOrder: null,
      sequencedData: null,
      sitePreferences: this.props.preferences,
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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
    // this.setState({ currentOrder: orderData });

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

    /* Rearrange the order of our sitePreferences */
    var sitePref = [];
    orderData.forEach((name) => {
      var objArr = this.state.sitePreferences;
      sitePref.push(this.getObj(objArr, 'componentName', name))
    });
    this.setState({ sitePreferences : sitePref });
  }

  componentWillMount() {
    // TODO: make a GET request to sitePreferences
    /*
     * This section puts the preferences in a format that SortableListView can accept
     *
     * SortableList requires data of this shape :
     * {
     *  componentName1: { componentName: 'TextContent' },
     *  componentName2: { componentName: 'Footer' }
     * }
     */
    let components = this.props.preferences;
    let sequencedData = {};
    components.map((c) => {
      sequencedData[c.componentName] = { componentName: c.componentName }
    });
    this.setState({ sequencedData });
  }

  componentDidMount() {
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

  handleUpdate() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    this.closeModal();
    socket.emit('updatePref', this.state.sitePreferences);
  }

  render() {
    return(
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.center}>Close menu</Text>
          </TouchableOpacity>
          <Text style={styles.bigText}>Rearrange Components</Text>
          <SequencedList data={this.state.sequencedData} onChangeOrder={this.onChangeOrder} />
          <View style={styles.options}>
            <Button onPress={this.handleUpdate} title="Update" />
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