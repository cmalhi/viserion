import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
const io = require('socket.io-client');
import { updateComponent } from '../../utils.js'

var {
  height: deviceHeight
} = Dimensions.get('window');

class LongTextModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      body: this.props.body,
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
    // socket.emit('changeLongTextDom', { key: this.props.id, textValue: this.state.body });
    // TODO: Make database call to save body to user preferences
    var value = this.state.body;
    var { id, path } = this.props.data;
    console.log('closeandupdate path >>', path);
    console.log('closeandupdate id >>', id);
    console.log('closeandupdate value >>', value);
    console.log('closeandupdate preferences >>', this.props.preferences);
    var newPref = updateComponent(this.props.preferences, id, path, value);
    socket.emit('updatePref', newPref);
  }

  render() {
    return (
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.center}>Close Menu</Text>
          </TouchableOpacity>
          <Text style={styles.bigText}>Edit Long Text</Text>
          <TextInput
            multiline={true}
            style={styles.form}
            onChangeText={(body) => this.setState({body})}
            value={this.state.body}
          />
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
    height: 250,
    fontSize: 20,
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
  return bindActionCreators({ updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(LongTextModal);
