import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
import changePrefs from '../utils/changePref';
const io = require('socket.io-client');

var {
  height: deviceHeight
} = Dimensions.get('window');
const socket = io(global.HOST, { transports: ['websocket'] });

class ShortTextModal extends React.Component {
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
    console.log('DATA', this.props.data)
  //   socket.emit('updatePref', [{
  //         id: 'hero',
  //         nickName: 'My Hero',
  //         componentName: <Hero1 />,
  //         attr: {
  //           bgColor: 'defaultColor',
  //           title: 'defaultTitle',
  //         },
  //       },
  //       {
  //         id: 'footer',
  //         nickName: 'My Footer',
  //         componentName: <Footer />,
  //         attr: {
  //           bgColor: 'defaultColor',
  //           text: 'defaultText',
  //         },
  //       }])
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal)
  }

  closeAndUpdate() {
    this.closeModal();
    // socket.emit('changeTitleDom', { key: this.props.id, textValue: this.state.title, data: this.props.data });
    this.props.data.newValue = this.state.title; 
    console.log('closeAndUpdate, this.props.preferences >>', this.props.preferences)
    console.log('closeAndUpdate, this.props.data >> ', this.props.data)
    var newPreferences = changePrefs(this.props.data, this.props.preferences);
    console.log('closeAndUpdate new preferences >> ', this.props.preferences);

    socket.emit('updatePref', newPreferences);
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

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({updatePrefs}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ShortTextModal);

