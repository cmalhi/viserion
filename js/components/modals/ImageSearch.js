import React from 'react';
import { StyleSheet, Image, TouchableHighlight, ScrollView, ListView, View, Text, TextInput, Button, Dimensions} from 'react-native';
import axios from 'axios';
import { bingImageSearch } from '../../../config/config';
import styles from '../../styles.js';
const key = bingImageSearch.API_KEY;

class ImageSearch extends React.Component {
  constructor() { 
    super()
    this.state = {
      images: [],
      text: ''
    }
    this.searchForImages = this.searchForImages.bind(this);
  }

  handlePress(id, url) {
    this.props.onSelect(url);
  }

  searchForImages(){
    axios({
      method: 'get',
      url: `https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${this.state.text}&count=36&offset=0&mkt=en-us&safeSearcs`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Ocp-Apim-Subscription-Key': key
      }
    })
    .then((response) => {
      var urlData =response.data.value.map((obj)=> {
        return (
          <TouchableHighlight key={obj.imageId} onPress={this.handlePress.bind(this, obj.imageId, obj.contentUrl)}>  
            <Image source={{uri: obj.thumbnailUrl}}
            style={styles.pic} />
          </TouchableHighlight>
        )
      });
        this.setState({images: [...urlData]});
      }).catch(function(err) {
        console.log('error',err);
    });
  }

  render() {
    return (
      <View>
        <Text style={[styles.text, styles.subtitle]}>Search for images: </Text>
        <TextInput
          style={[{height: 40}, styles.form]}
          placeholder="search"
          onChangeText={ (text) => this.setState({text}) }
          clearButtonMode={'unless-editing'}
          keyboardType={"default"}
          autoFocus
          returnKeyType="go"
          onEndEditing={this.searchForImages}
        />
        <View style={[styles.center, {marginTop: '5%'}]}>    
          <TouchableHighlight
            style={ [styles.buttonCentered, styles.continueButton] }
            underlayColor='#1D59BF'
            onPress={this.searchForImages}
          >
            <Text style={ [styles.buttonText, { color: '#eee'}] }>Search</Text>
          </TouchableHighlight>
        </View>
        <View style={{height: Dimensions.get('window').height * 0.45}}>
          <ScrollView>
            <View style={[styles.scrollGrid, {marginTop: '5%'}]} >
              {this.state.images}
            </View>
          </ScrollView>
        </View>
      </View>  
    )
  }
}

export default ImageSearch;
