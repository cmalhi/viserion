import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, WebView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import styles from '../styles';
import { updatePrefs } from '../actions/index';
import { editSite } from '../actions/siteActions';
import Loading from './Loading';
import LoginSignUpSplash from './LoginSignUpSplash'

class MyPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      userId: null,
    };
    this.handleSitePress = this.handleSitePress.bind(this);
  }

  handleSitePress(site) {
    const { navigate } = this.props.navigation;
    this.props.updatePrefs(site.preferences);
    this.props.editSite(site._id);
    navigate('UserEdit');
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    AsyncStorage.getItem('userId')
      .then(userId => {
        if (userId) {
          axios.get(`${global.HOST}/sites/all/${userId}`)
            .then((res) => {
              this.setState({ sites: res.data, userId });
            })
            .catch((err) => console.log('Err getting /sites/all ', err));
        }
      });
  }

  renderSavedSites() {
    return this.state.sites.map(site => {
      return (
        <View key={site._id} style={[styles.galleryContainer, styles.center]}>
          <TouchableOpacity onPress={this.handleSitePress.bind(this, site)}>
              <WebView style={{marginBottom: 20, width: Dimensions.get('window').width - 50, height: Dimensions.get('window').height - 130}}
                automaticallyAdjustContentInsets={false}
                scrollEnabled={false}
                scalesPageToFit={true}
                source={{ uri: `${global.HOST}/id/${site._id}` }}>
            </WebView>
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return this.state.userId 
      ? (<View style={styles.galleryContainer}>
          {this.state.sites.length 
            ? (<ScrollView contentContainerStyle={styles.content}>
                {this.renderSavedSites()} 
              </ScrollView>) 
            : <Loading />}
        <View>
          <TouchableHighlight
            style={[styles.addButton, styles.buttonCentered]}
            underlayColor='#ff7043'
            onPress={()=>{ navigate('Template') }}
          >
            <Entypo name="plus" size={25} color="white" />
          </TouchableHighlight>
        </View>
      </View>)
    : <LoginSignUpSplash />
  }
}

export default connect(null, { updatePrefs, editSite })(MyPages);
