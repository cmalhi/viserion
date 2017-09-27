import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, WebView, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import styles from '../styles';
import { updatePrefs } from '../actions/index';
import { editSite } from '../actions/siteActions';
import Loading from './Loading';
import LoginSplashScreen from './Login/LoginSplashScreen';

class MyPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      userId: null,
    };
    this.handleSitePress = this.handleSitePress.bind(this);
    this.fetchSavedSites = this.fetchSavedSites.bind(this);
    this.checkUserStatus = this.checkUserStatus.bind(this);
  }

  componentDidMount() {
    this.checkUserStatus();
  }

  componentWillReceiveProps(nextProps) {
    console.log('my pages will get props', nextProps);
    this.checkUserStatus();
  }

  handleSitePress(site) {
    const { navigate } = this.props.navigation;
    this.props.updatePrefs(site.preferences);
    this.props.editSite(site._id);
    navigate('UserEdit');
  }

  fetchSavedSites(userId) {
    axios.get(`${global.HOST}/sites/all/${userId}`)
      .then((res) => {
        this.setState({ sites: res.data});
      })
      .catch((err) => console.log('Err getting /sites/all ', err));
  }

  checkUserStatus() {
    this.setState({userId: this.props.auth.userId});
    AsyncStorage.getItem('userId')
      .then((userId) => {
        if (userId) {
          this.setState({ userId });
          this.fetchSavedSites(userId);
        }
      });
  }

  renderSavedSites() {
    return this.state.sites.map(site => {
      return (
        <View key={site._id} style={[styles.galleryContainer, styles.center]}>
          <TouchableOpacity onPress={this.handleSitePress.bind(this, site)}>
            <Image style={{marginBottom: 20, width: Dimensions.get('window').width - 50, height: Dimensions.get('window').height - 80}} source={{uri: `https://viserion-hr.s3.amazonaws.com/${site._id}.png`}} key={`img-${new Date().getTime()}`} />
              {/*<WebView style={{marginBottom: 20, width: Dimensions.get('window').width - 50, height: Dimensions.get('window').height - 130}}*/}
                {/*automaticallyAdjustContentInsets={false}*/}
                {/*scrollEnabled={false}*/}
                {/*scalesPageToFit={true}*/}
                {/*source={{ uri: `${global.HOST}/id/${site._id}` }}>*/}
            {/*</WebView>*/}
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
      : (<LoginSplashScreen rootNavigate={navigate} />);
  }
}

function mapStateToProps({ auth }) {
  return { auth };
};

export default connect(mapStateToProps, { updatePrefs, editSite })(MyPages);
