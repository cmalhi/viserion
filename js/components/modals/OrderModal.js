import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, Button, StyleSheet, TextInput, Platform, Easing } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeOrder } from '../../actions/index';
import SequencedList from '../utils/SequencedList';

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
    this.openAddCloseOrder = this.openAddCloseOrder.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);

  }

  getObj = (objArr, key, value) => {
    for (var i = 0; i < objArr.length; i++) {
      if (objArr[i][key] && objArr[i][key] === value) {
        return objArr[i]
      }
    }
    return false;
  };

  onChangeOrder(orderData) {
    console.log('changing order!', orderData);
    const socket = io(global.HOST, { transports: ['websocket'] });

    this.setState({ currentOrder: orderData }); // MAY NOT NEED
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

    /*
     * Input:
     *  - objArr [ {1: 'hi', 2: 'bye}, {1: 'hello} ]
     *  - key: 1
     *  - value: 'hi'
     * Output:
     *  - {1: 'hi', 2: 'bye'}
     */


    var sitePref = { components: [] };
    orderData.forEach((name) => {
      var objArr = this.state.sitePreferences['components'];
      sitePref.components.push(this.getObj(objArr, 'componentName', name))
    });

    console.log('sitePref', sitePref);
    this.setState({sitePreferences : sitePref});
  }

  componentWillMount() {
    //this line will change when preferences obj is set up
    // this.setState({order: this.props.order})
    // this.props.changeOrder(order);

    // assume sitePreferences of shape
    /*
     * sitePreferences = {
     *  components: [
     *    { nickName: '', componentName: '', attr: {} }
     *  ]
     * }
     */

    // TODO: make a GET request to sitePreferences
    const exampleSitePreferences = {
      components: [
        {
          componentName: 'Hero',
          attr: { title: 'Hello' },
        },
        {
          componentName: 'TextContent',
          attr: { title: 'title', body: 'goodbye' },
        },
        {
          componentName: 'Footer',
          attr: { title: 'Hello' },
        },
      ]
    };

    this.setState({ sitePreferences: exampleSitePreferences });

    /*
     * {
     *  componentName1: { componentName: 'TextContent' },
     *  componentName2: { componentName: 'Footer' }
     * }
     */
    let newObj = {};
    let componentData = exampleSitePreferences.components.map((c) => {
      newObj[c.componentName] = { componentName: c.componentName }
    });

    console.log('newObj', newObj);

    // const data = {
    //   TextContent: {
    //     text: 'Chloe',
    //     image: 'https://placekitten.com/200/240',
    //   },
    //   Jasper: {
    //     text: 'Jasper',
    //     image: 'https://placekitten.com/200/201',
    //   },
    //   Pepper: {
    //     text: 'Pepper',
    //     image: 'https://placekitten.com/200/202',
    //   },
    //   Oscar: {
    //     text: 'Oscar',
    //     image: 'https://placekitten.com/200/203',
    //   },
    // };

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
    // this.props.changeOrder(this.state.order);
    // socket.emit('orderChange', this.state.order);

    socket.emit('newPref', this.state.sitePreferences);
  }

  openAddCloseOrder() {
    this.closeModal();
    // this.props.openAddModal();
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
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

function mapStateToProps({ order }) {
  return { order };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({changeOrder}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(OrderModal);


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
    height: '90%',
  },
  bigText:{
    fontSize: 20,
  },
  options:{
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});


