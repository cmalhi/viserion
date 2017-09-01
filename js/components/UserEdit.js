import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
const io = require('socket.io-client');
import ImageModal from './modals/ImageModal';
import TextModal from './modals/TextModal';
import ColorModal from './modals/ColorModal';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';

var {
  height: deviceHeight
} = Dimensions.get('window');

export default class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textModal: false,
      title: '',
      imageModal: false,
      colorModal: false,
    }
  };

  componentDidMount() {
    const socket = io(global.HOST, { transports: ['websocket'] });

    socket.on('titleChange', (title) => {
      this.setState({ title, textModal: true });
    });

    socket.on('imgChange', (img) => {
      this.setState({ imageModal: true });
    });

    socket.on('colorChange', (data) => {
      console.log('colorChange data', data);
      this.setState({ colorModal: true });
    });
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <WebView style={styles.webView} source={{uri: `${global.HOST}/pages/templates/full.html`}} />
        {this.state.textModal ? <TextModal title={this.state.title} closeModal={() => this.setState({textModal: false}) } /> : null}
        {this.state.imageModal ? <ImageModal closeModal={() => this.setState({imageModal: false})} /> : null}
        {this.state.colorModal ? <ColorModal navigation={this.props.navigation} closeModal={() => this.setState({colorModal: false})} /> : null}
      </View>
    )
  };
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
    borderRadius: 10
  },
  bigText:{
    fontSize: 20,
  },
});