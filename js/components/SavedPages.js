import React from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios';
import { updatePrefs } from '../actions/index';

class SavedPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sites: [],
      userId: '',
    };

    this.handleLinkPress = this.handleLinkPress.bind(this);
  }

  handleLinkPress(site) {
    const { navigate } = this.props.navigation;
    this.props.updatePrefs(site.preferences);
    navigate('UserEdit', {siteId: site._id, sitePreferences: site.preferences, userId: this.state.userId });
  }


  componentDidMount() {
    AsyncStorage.getItem('userId')
      .then(userId => {
        // TODO: remove hard coded user ID
        // userId = 'test';
        axios.get(`${global.HOST}/sites/all/${userId}`)
          .then((res) => {
            this.setState({ sites: res.data, userId });
          })
          .catch((err) => console.log('Err getting /sites/list: ', err));
      })
  }

  render() {
    let images = [];
    if (this.state.sites.length > 0){
      // Pull just the URLs
      images = this.state.sites.map((site) => {
        return (
          <TouchableOpacity key={site['_id']} onPress={this.handleLinkPress.bind(this, site)}>
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


export default connect(null, { updatePrefs })(SavedPages);

// <View key={t['_id']}>
//   <Text>{t['_id']}</Text>
//    { t.screenshot && <Image style={{width:400, height: 200}} source={require('./example.png')} resizeMode="contain" /> }
//  </View>