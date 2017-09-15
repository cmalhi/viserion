import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, Button, StyleSheet, TextInput } from 'react-native';
import { ImagePicker } from 'expo';
import { RNS3 } from 'react-native-aws3';
import ImageSearch from './ImageSearch'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
const io = require('socket.io-client');
import { updateComponent } from '../../utils.js';

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
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.center}>Close Menu</Text>
          </TouchableOpacity>
          <Text style={styles.bigText}>Choose an image</Text>
          <ImageSearch onSelect={this.imageSearchCallback}/>
          <Button onPress={this._pickImage} title="Select From Camera Roll" />
          {/*{img && <Image source={{ uri: img }} style={{ width: 200, height: 200 }} />}*/}
          {/*<Button onPress={this.closeAndUpdate} title="Enter" />*/}
        </View>
      </Animated.View>
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
    fontSize: 30,
  },
});