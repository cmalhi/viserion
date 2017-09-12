import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, Button, StyleSheet, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
import { updateComponent } from '../../utils.js'
import { TriangleColorPicker } from 'react-native-color-picker';
import ColorPalette from './ColorPalette';
import GradientPalette from './GradientPalette';
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
    console.log('the gradient is ', this.state.gradient)
    console.log('the data is ', this.props.data)
    if(this.state.type === 'gradient'){
      var value = this.state.gradient;
    } else {
      var value = this.state.color;
    }
    var { id, path } = this.props.data;
    var newPref = updateComponent(this.props.preferences, id, path, value);
    socket.emit('updatePref', newPref)
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
            <Text style={styles.center}>Close menu</Text>
          </TouchableOpacity>
          <Text style={styles.bigText}>Choose a color</Text>
          {this.state.type === 'gradient' ? <GradientPalette setColor={this.setColor} type={this.props.data.type}/> : <ColorPalette setColor={this.setColor} type={this.props.data.type}/>}
          <Text onPress={() => { navigate('ColorPicker')}}>Color picker</Text>
          <Text>{this.state.color}</Text>
          <Button onPress={this.closeAndUpdate} title="Enter" />
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
    width: 300,
    backgroundColor: '#fff',
    padding: 10,
    // position: 'relative',
    top: '5%',
    borderRadius: 10,
  },
  bigText:{
    fontSize: 20,
  },
});

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ColorModal);
