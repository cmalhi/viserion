import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
const io = require('socket.io-client');
import ImageModal from './modals/ImageModal';
import ShortTextModal from './modals/ShortTextModal';
import ColorModal from './modals/ColorModal';
import OrderModal from './modals/OrderModal';
import AddPageModal from './modals/AddPageModal';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

var {
  height: deviceHeight
} = Dimensions.get('window');

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortTextModal: false,
      title: '',
      imageModal: false,
      colorModal: false,
      imageId: null,
      textId: null,

      order: [],
      html: '',
      componentOrder: '',

      orderModal: false,
      addPageModal: false,
    };
    this.handleAddOrRearrange = this.handleAddOrRearrange.bind(this);
  }

  componentDidMount() {
    this.setState({order: this.props.order}, ()=>{
      console.log('component did mount', this.props.order)
    });

    const socket = io(global.HOST, { transports: ['websocket'] });

    socket.on('launchTitleModal', (titleData) => {
      this.setState({ shortTextModal: true, textId: titleData.key, title: titleData.textValue, });
    });

    socket.on('launchImageModal', (id) => {
      this.setState({ imageModal: true, imageId: id });
    });

    socket.on('colorChange', (data) => {
      console.log('colorChange data', data);
      this.setState({ colorModal: true });
    });
  }

  handleAddOrRearrange() {
    this.setState({ orderModal: true });
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <WebView style={styles.webView} source={{uri: `${global.HOST}/pages/templates/reactify.html`}} />
        {this.state.shortTextModal ? <ShortTextModal id={this.state.textId} title={this.state.title} closeModal={() => this.setState({shortTextModal: false}) } /> : null}
        {this.state.imageModal ? <ImageModal id={this.state.imageId} closeModal={() => this.setState({imageModal: false})} /> : null}
        {this.state.colorModal ? <ColorModal navigation={this.props.navigation} closeModal={() => this.setState({colorModal: false})} /> : null}
        {this.state.orderModal ? <OrderModal closeModal={() => this.setState({orderModal: false})} /> : null}
        {this.state.addPageModal ? <AddPageModal closeModal={() => this.setState({addPageModal: false})} openAddModal={() => this.setState({addPageModal: true, orderModal: false})} /> : null}
        <Button title="Add/Rearrange (click this 2x)" onPress={this.handleAddOrRearrange} />
      </View>
    );
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
    width: '100%',
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
  innerModal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    position: 'relative',
    top: '5%',
    borderRadius: 10,
  },
  bigText: {
    fontSize: 20,
  },
});

function mapStateToProps({ order }) {
  return { order };
}

export default connect(mapStateToProps, null)(UserEdit);
