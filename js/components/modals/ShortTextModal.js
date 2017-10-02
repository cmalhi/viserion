import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
import ColorPalette from './ColorPalette';
var DismissKeyboard = require('dismissKeyboard');
import { updateComponent } from '../../utils.js';
const io = require('socket.io-client');
import styles from '../../styles.js';

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
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
    this.setColor = this.setColor.bind(this);
    this.saveColorToPref = this.saveColorToPref.bind(this);
    this.textColorPress = this.textColorPress.bind(this);
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

  setColor(color) {
    this.setState({color: color});
    this.setState({colorChange: true});
  }

  textColorPress() {
    console.log('textColorPress');
    this.setState({palette: !this.state.palette});
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
            <View style={styles.mainContainer}>
              <View style={styles.keywordsContainer}>
                <TouchableHighlight style={styles.keyword} onPress={this.textColorPress}>
                  <Text style={[styles.text, styles.keywordText, { fontFamily: 'Avenir-Heavy' }]} >Text Color</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.keywordsContainer}>
                <TouchableHighlight style={styles.keyword} onPress={this.textColorPress}>
                  <Text style={[styles.text, styles.keywordText, { fontFamily: 'Avenir-Heavy' }]} >Text Size</Text>
                </TouchableHighlight>
              </View>
            </View>
            {this.state.size && <TextSizeChanger />}
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

