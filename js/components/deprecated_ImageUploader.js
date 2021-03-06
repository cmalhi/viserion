import React from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo';

export default class ImageUploader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: null
    };
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <Button onPress={this._pickImage} title="Pick an image from the camera roll" />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    )
  }

  _pickImage = async () => {
    let result = await ImagePicker
      .launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4,3]
      });

    console.log('result', result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
