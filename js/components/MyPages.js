import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { updatePrefs } from '../actions/index';

class MyPages extends React.Component {
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
        userId = 'test';
        axios.get(`${global.HOST}/sites/all/${userId}`)
          .then((res) => {
            console.log('res data >>>>>>>', res.data);
            this.setState({ sites: res.data, userId });
          })
          .catch((err) => console.log('Err getting /sites/list: ', err));
      });
  }

  renderSavedSites() {
    return this.state.sites.map(site => {
      return (
        <View style={styles.items}>
          <TouchableOpacity onPress={this.handleLinkPress.bind(this, site)}>
            <View style={styles.item}>
              <Text>{site._id}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.sites.length) return <Text>Loading...</Text>
    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {this.renderSavedSites()}
        </ScrollView>
        <View>
          <TouchableHighlight
            style={styles.addButton}
            underlayColor='#ff7043'
            onPress={()=>{ navigate('Template') }}
          >
            <Entypo name="plus" size={25} color="white" />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    // flex: 1,
    padding: 10,
  },
  text:{
  },
  items: {
    flexDirection: 'column',
  },
  item: {
    height: 200,
    width: '100%',
    backgroundColor: '#eee',
    margin: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: "#000000",
    paddingLeft: 1,
    paddingTop: 2,
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 0
    // }
  }
});

export default connect(null, { updatePrefs })(MyPages);