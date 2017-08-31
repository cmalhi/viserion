import React from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
const io = require('socket.io-client');

var {
  height: deviceHeight
} = Dimensions.get('window');

export default class ReactTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
    }
  };

  componentDidMount() {
    const socket = io(global.HOST, { transports: ['websocket'] });

    socket.on('titleChange', (title) => {
      this.setState({ title, modal: true });
    });
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <WebView style={styles.webView} source={{uri: `${global.HOST}/pages/templates/full.html`}} />
        {this.state.modal ? <Modal title={this.state.title} closeModal={() => this.setState({modal: false}) } /> : null}
      </View>
    )
  };
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      title: '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  }

  closeAndUpdate() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    this.closeModal();
    // emit to socket to change text
    socket.emit('titleChange2', this.state.title);
  }

  render() {
    return (
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.center}>Close Menu</Text>
          </TouchableOpacity>
          <Text style={styles.bigText}>Edit Text</Text>
          <TextInput style={styles.form} onChangeText={(title) => this.setState({title})} placeholder={this.props.title} value={this.state.title} />
          <Button onPress={this.closeAndUpdate} title="Enter" />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(0,0,0,.5)',
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