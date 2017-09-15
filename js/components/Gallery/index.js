import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import styles from '../../styles';
import { updatePrefs } from '../../actions/index';
import { editSite } from '../../actions/siteActions';
import Loading from '../Loading';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sites: [],
      userId: '',
    };
    this.handleSitePress = this.handleSitePress.bind(this);
  }

  handleSitePress(site) {
    const { navigate } = this.props.navigation;
    this.props.updatePrefs(site.preferences);
    this.props.editSite(site._id);
    console.log('site pressed', site.preferences);
    navigate('GalleryViewer');
  }

  componentDidMount() {
    axios.get(`${global.HOST}/sites/all`)
      .then((res) => {
        console.log('res data >>>>>', res);
        this.setState({ sites: res.data });
      })
      .catch((err) => console.log('Err getting /sites/ ', err));
  }

  renderSavedSites() {
    return this.state.sites.map(site => {
      return (
        <View key={site._id} style={styles.itemsColumn}>
          <TouchableOpacity onPress={this.handleSitePress.bind(this, site)}>
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
    return(
      <View style={styles.basicContainer}>
        {this.state.sites.length ? (<ScrollView contentContainerStyle={styles.content}>
          {this.renderSavedSites()}
        </ScrollView>) : <Loading />}
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

export default connect(null, { updatePrefs, editSite })(Gallery);
