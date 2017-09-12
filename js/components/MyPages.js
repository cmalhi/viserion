import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import styles from '../styles';
import { updatePrefs, editSite } from '../actions/index';

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
    this.props.editSite(site._id);
    navigate('UserEdit');
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
        <View style={styles.itemsColumn}>
          <TouchableOpacity onPress={this.handleLinkPress.bind(this, site)}>
            <View style={styles.boxItem}>
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
      <View style={styles.basicContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          {this.renderSavedSites()}
        </ScrollView>
        <View>
          <TouchableHighlight
            style={[styles.addButton, styles.buttonCentered]}
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

export default connect(null, { updatePrefs })(MyPages);