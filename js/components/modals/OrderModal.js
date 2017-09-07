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
      order: this.props.order,
      currentOrder: null,
      data: data,
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
    this.openAddCloseOrder = this.openAddCloseOrder.bind(this);

  }

  componentWillMount() {
    //this line will change when preferences obj is set up
    // this.setState({order: this.props.order})
    this.props.changeOrder(order);
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
    this.props.changeOrder(this.state.order);
    socket.emit('orderChange', this.state.order);
  }

  openAddCloseOrder() {
    this.closeModal();
    this.props.openAddModal();
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
          <SequencedList data={data} />
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




// let data = {
//   "React.createElement(Title, null)": {
//     //nickname
//     text: "Title",
//     img: "../../../images/orderListEntry/png/header.png",
//   },
//   "React.createElement(MyComponent, null)": { text: "MyComponent" },
//   "React.createElement(Body, null)": { text: "Body" },
//   "React.createElement(MyComponent2, null)": { text: "MyComponent2" },
//   "React.createElement(Pricing, null)": { text: "Pricing" },
//   "React.createElement(Gallery, null)": { text: "Gallery" },
//   "React.createElement(Footer, null)" : { text: "Footer" },
// };

const data = {
  0: {
    image: 'https://placekitten.com/200/240',
    text: 'Chloe',
  },
  1: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
  },
  2: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
  },
  3: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
  },
};

let order = Object.keys(data);
//Array of keys


//comes in from db/preferences obj
const order2 = ["React.createElement(Title, null)", "React.createElement(MyComponent, null)", "React.createElement(Body, null)", "React.createElement(MyComponent2, null)", "React.createElement(Gallery, null)", "React.createElement(Pricing, null)", "React.createElement(Footer, null)"];
