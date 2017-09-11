import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default class SavedPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sites: [] };

    this.handleLinkPress = this.handleLinkPress.bind(this);
  }

  handleLinkPress(site) {
    console.log(site);
  }


  componentDidMount() {
    axios.get(`${global.HOST}/sites/all/test`)
      .then((res) => {
        console.log(res.data);
        this.setState({ sites: res.data });
      })
      .catch((err) => console.log('Err getting /sites/list: ', err));
  }

  render() {
    let images = [];
    if (this.state.sites.length > 0){
      // Pull just the URLs
      images = this.state.sites.map((site) => {
        return (
          <TouchableOpacity onPress={this.handleLinkPress.bind(this, site)}>
            <Text>{site._id}</Text>
          </TouchableOpacity>
        )
      })
    }
    return (
      <View>
        <Text>Saved pages</Text>
        {images}
      </View>
    )
  }
}

// <View key={t['_id']}>
//   <Text>{t['_id']}</Text>
//    { t.screenshot && <Image style={{width:400, height: 200}} source={require('./example.png')} resizeMode="contain" /> }
//  </View>