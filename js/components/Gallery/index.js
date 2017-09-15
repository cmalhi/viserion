import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableHighlight, TouchableOpacity, WebView, Dimensions } from 'react-native';
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
    return(
      <View style={styles.galleryContainer}>
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { updatePrefs, editSite })(Gallery);
