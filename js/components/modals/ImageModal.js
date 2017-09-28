import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, Button, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import ImageSearch from './ImageSearch'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
import { updateComponent } from '../../utils.js';
var DismissKeyboard = require('dismissKeyboard');
const io = require('socket.io-client');
import styles from '../../styles.js'

var {
  height: deviceHeight
} = Dimensions.get('window');

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      img: null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
    this.imageSearchCallback = this.imageSearchCallback.bind(this);
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

    // TODO: Save image to user preferences

    // Put image into AWS
    let file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: this.state.img,
      name: `${this.props.siteId + JSON.stringify(Math.random()*10000).split('.')[0]}.png`,
      type: "image/png"
    };

    RNS3.put(file, global.AWSEC3).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      const imageUrl = response.body.postResponse.location;
      var { id, path, room } = this.props.data;
      var newPref = updateComponent(this.props.preferences, id, path, imageUrl);
      socket.emit('updatePref', { room, newPref });
      // socket.emit('changeImageDom', {key: this.props.id, src: imageUrl});
    });
  }

  render() {
    let { img } = this.state;
    return (
      <TouchableWithoutFeedback onPress={ () => { DismissKeyboard() } }>
        <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}, {maxHeight: '80%'}]}>
          <View style={styles.innerModal}>
            <TouchableOpacity onPress={this.closeModal}>
              <Text style={[styles.center, styles.subtitle, styles.text]}>Close Menu</Text>
            </TouchableOpacity>
            <Text style={[styles.title, styles.inverse]}>Choose an image</Text>
            <ImageSearch onSelect={this.imageSearchCallback}/>
            {/*{img && <Image source={{ uri: img }} style={{ width: 200, height: 200 }} />}*/}
            {/*<Button onPress={this.closeAndUpdate} title="Enter" />*/}
            <View style={[{marginTop: '5%'}, styles.center]}>    
              <TouchableHighlight
                style={ [styles.buttonCentered, styles.continueButton] }
                underlayColor='#1D59BF'
                onPress={this._pickImage}
              >
                <Text style={ [styles.buttonText, { color: '#eee', }] }>Camera Roll</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Animated.View>
       </TouchableWithoutFeedback>
    )
  }
  
  imageSearchCallback(imgCB){
    const socket = io(global.HOST, { transports: ['websocket'] });    
    this.setState({img: imgCB});
    var value = imgCB;
    var { id, path, room } = this.props.data;
    var newPref = updateComponent(this.props.preferences, id, path, value);
    socket.emit('updatePref', {room, newPref});
    // socket.emit('changeImageDom', {key: this.props.id, src: imgCB});    
    this.closeModal();
  }

  _pickImage = async() => {  
    let result = await ImagePicker
      .launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4,3],
      });

    if (!result.cancelled) {
      this.setState({ img: result.uri }, this.closeAndUpdate);
    }
  }
}

function mapStateToProps({ preferences, siteId }) {
  return { preferences, siteId };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ImageModal);
