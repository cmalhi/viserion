import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
import { updateComponent } from '../../utils.js';
import ColorPalette from './ColorPalette';
import TextSizeChanger from '../TextEdit/TextSizeChanger';
import FontChanger from '../TextEdit/FontChanger';
import styles from '../../styles.js';
var DismissKeyboard = require('dismissKeyboard');
const io = require('socket.io-client');

var {
  height: deviceHeight
} = Dimensions.get('window');

class ShortTextModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      title: null,
      color: null,
      colorChange: false,
      palette: false,
      font: false,
      size: false,
      fontSize: null,
      fontType: null,
      fontChange: false,
      sizeChange: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
    this.setColor = this.setColor.bind(this);
    this.saveColorToPref = this.saveColorToPref.bind(this);
    this.textColorPress = this.textColorPress.bind(this);
    this.textSizePress = this.textSizePress.bind(this);
    this.fontPress = this.fontPress.bind(this);
    this.setTextSize = this.setTextSize.bind(this);
    this.setFont = this.setFont.bind(this);
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
    }).start(this.props.closeModal)
  }

  closeAndUpdate() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    this.closeModal();
    if (this.state.colorChange) {
      this.saveColorToPref();
    } if (this.state.title !== null){
      var value = this.state.title;
      var { id, path, room } = this.props.data;
      var newPref = updateComponent(this.props.preferences, id, path, value);
      socket.emit('updatePref', {room, newPref});
    }
  }

  saveColorToPref() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    var { id, room, colorPath } = this.props.data;
    var newPref = updateComponent(this.props.preferences, id, colorPath, this.state.color);
    socket.emit('updatePref', { room: room, newPref: newPref });
  }

  saveSizeToPref() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    var { id, room, sizePath } = this.props.data;
    var newPref = updateComponent(this.props.preferences, id, sizePath, this.state.size);
    socket.emit('updatePref', { room: room, newPref: newPref });
  }

  setColor(color) {
    this.setState({color: color});
    this.setState({colorChange: true});
  }

  textColorPress() {
    this.setState({palette: !this.state.palette});
    this.setState({size: false});
    this.setState({font: false});
  }

  textSizePress() {
    this.setState({size: !this.state.size});
    this.setState({palette: false});
    this.setState({font: false});
  }

  fontPress() {
    this.setState({font: !this.state.font});
    this.setState({palette: false});
    this.setState({size: false});
  }

  setTextSize(size) {
    this.setState({fontSize: size});
    this.setState({sizeChange: true});
    console.log('font size set')
  }

  setFont(font) {
    this.setState({fontType: font});
    this.setState({fontChange: true});
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => { DismissKeyboard() } }>
        <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
          <View style={styles.innerModal}>
            <TouchableOpacity onPress={this.closeModal}>
              <Text style={[styles.center, styles.subtitle, styles.text]}>Close Menu</Text>
            </TouchableOpacity>
            <Text style={[styles.title, styles.inverse]}>Edit Text</Text>
            <TextInput
              style={styles.form}
              onChangeText={(title) => this.setState({title})}
              placeholder={this.props.title}
              value={this.state.title}
            />
            <Button style={this.state.color} title={'T color'} onPress={this.textColorPress}/>
            <Button title={'T size'} onPress={this.textSizePress}/>
            <Button title={'T font'} onPress={this.fontPress}/>
            {this.state.size && <TextSizeChanger setTextSize={this.setTextSize} data={this.props.data}/>}
            {this.state.font && <FontChanger />}
            {this.state.palette && <ColorPalette setColor={this.setColor} data={this.props.data}/>}
            <View style={[{marginTop: '5%'}, styles.center]}>    
              <TouchableHighlight
                style={ [styles.buttonCentered, styles.continueButton] }
                underlayColor='#1D59BF'
                onPress={this.closeAndUpdate}
              >
                <Text style={ [styles.buttonText, { color: '#eee', }] }>Enter</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ShortTextModal);

