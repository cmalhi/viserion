import React from 'react';
import { StyleSheet, Image, TouchableHighlight, ScrollView, ListView, View, Text, TextInput, Button, Dimensions} from 'react-native';
import axios from 'axios';
import { bingImageSearch } from '../../../config/config';
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
        <Text>Search for images: </Text>
        <TextInput
          style={{height: 40}}
          placeholder="search"
          onChangeText={ (text) => this.setState({text}) }
          clearButtonMode={'unless-editing'}
          keyboardType={"default"}
          autoFocus
          returnKeyType="go"
          onEndEditing={this.searchForImages}
        />
        <Button
          onPress={this.searchForImages}
          title="Search"
          color="#000000"
        />
        <View style={{height: Dimensions.get('window').height * 0.45}}>
          <ScrollView>
            <View style={styles.scrollGrid} >
              {this.state.images}
            </View>
          </ScrollView>
        </View>
      </View>  
    )
  }
}

const styles = StyleSheet.create({
  scrollGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    paddingVertical: 20,
  },
  pic: {
    backgroundColor: '#CCC',
    margin: 10,
    width: 80,
    height: 80
  },
});

export default ImageSearch;