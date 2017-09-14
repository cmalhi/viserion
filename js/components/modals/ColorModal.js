import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, Button, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
import { updateComponent } from '../../utils.js'
import { TriangleColorPicker } from 'react-native-color-picker';
import ColorPalette from './ColorPalette';
import GradientPalette from './GradientPalette';
import styles from '../../styles.js';
const io = require('socket.io-client');


var {
  height: deviceHeight
} = Dimensions.get('window');

class ColorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      color: null,
      type: 'solid',
      gradient: null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
    if (this.props.data.type === 'gradient') {
      this.setState({type: this.props.data.type});
    }
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal)
  }

  closeAndUpdate(){
    const socket = io(global.HOST, { transports: ['websocket'] });
    this.closeModal();
    // socket.emit('colorChange2', this.state.color);
    var value;
    if(this.state.type === 'gradient'){
      var value = this.state.gradient;
    } else {
      var value = this.state.color;
    }
    var { id, path, room } = this.props.data;
    var newPref = updateComponent(this.props.preferences, id, path, value);
    socket.emit('updatePref', {room: room, newPref: newPref})
  }

  setColor(color) {
    if(this.state.type === 'gradient') {
      this.setState({gradient: color})
    } else if (this.state.type === 'solid') {
      this.setState({ color });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return(
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={[styles.center, styles.text, styles.subtitle]}>Close Menu</Text>
          </TouchableOpacity>
          <Text style={[styles.text, styles.title]}>Choose a color</Text>
          {this.state.type === 'gradient' ? <GradientPalette setColor={this.setColor} type={this.props.data.type}/> : <ColorPalette setColor={this.setColor} type={this.props.data.type}/>}
          <Text tyle={[styles.center, styles.text, styles.subtitle]} onPress={() => { navigate('ColorPicker')}}>Color picker</Text>
          <Text>{this.state.color}</Text>
          <View style={styles.center}>    
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
    );
  }
}

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ColorModal);
