import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
const io = require('socket.io-client');
import { updateComponent } from '../../utils.js';
import ColorPalette from './ColorPalette';
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
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
    this.setColor = this.setColor.bind(this);
    this.saveColorToPref = this.saveColorToPref.bind(this);
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
    if(this.state.colorChange) {
      console.log('saving color');
      this.saveColorToPref();
    } else if (this.state.title){
      // socket.emit('changeTitleDom', { key: this.props.id, textValue: this.state.title, data: this.props.data });
      var value = this.state.title;
      var { id, path, room } = this.props.data;
      var newPref = updateComponent(this.props.preferences, id, path, value);
      socket.emit('updatePref', {room, newPref});
    }
  }

  saveColorToPref() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    var { id, path, room } = this.props.data;
    path.pop();
    path.push('textColor');
    var newPref = updateComponent(this.props.preferences, id, path, this.state.color);
    socket.emit('updatePref', { room: room, newPref: newPref });
  }

  setColor(color) {
    this.setState({color: color});
    this.setState({colorChange: true});
  }

  render() {
    return (
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={[styles.center, styles.text, styles.subtitle]}>Close Menu</Text>
          </TouchableOpacity>
          <Text style={[styles.text, styles.title]}>Edit Text</Text>
          <TextInput
            style={styles.form}
            onChangeText={(title) => this.setState({title})}
            placeholder={this.props.title}
            value={this.state.title}
          />
          <View style={{marginTop: '5%'}}>
            <ColorPalette setColor={this.setColor} data={this.props.data}/>
          </View>
          <Text>{this.state.color}</Text>
          <View style={styles.center}>    
            <TouchableHighlight
              style={ [styles.buttonCentered, styles.continueButton] }
              underlayColor='#1D59BF'
              onPress={this.closeAndUpdate}
            >
              <Text style={ [styles.buttonText, { color: '#eee', }] }>Continue</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Animated.View>
    )
          // <Button style={[styles.buttonText, { color: '#eee', }]} onPress={this.closeAndUpdate} title="Enter" />
  }
}

// const styles = StyleSheet.create({
//   form: {
//     padding: 10,
//     borderColor: '#eee',
//     borderWidth: 1,
//   },
//   flexContainer: {
//     flex: 1,
//   },
//   webView: {
//     padding: 10,
//     width: '100%'
//   },
//   modal: {
//     backgroundColor: 'rgba(0,0,0,.3)',
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     width: '100%',
//     alignItems: 'center',
//   },
//   innerModal:{
//     width: '80%',
//     backgroundColor: '#fff',
//     padding: 10,
//     position: 'relative',
//     top: '5%',
//     borderRadius: 10
//   },
//   bigText:{
//     fontSize: 20,
//   },
// });

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ShortTextModal);

