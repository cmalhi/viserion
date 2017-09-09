import React from 'react';
import {
  Text,
  View,
  WebView,
  Button,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addSite, selectPreferences } from '../actions/index';
import axios from 'axios';
<<<<<<< HEAD

var source = [{ uri: 'http://google.com' }, { uri: 'http://nfl.com' }, { uri: 'http://cnn.com' }];
=======
import renderHtmlTemplate from '../htmlTemplate';
>>>>>>> siteselect

class ConfirmSite extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
<<<<<<< HEAD
          uris: [],
      };
      this.handlePress = this.handlePress.bind(this);
      this.getURIs = this.getURIs.bind(this);
  }

  componentDidMount() {
    this.getURIs();
  }

 getURIs() {
    axios.get(`${global.HOST}/usertemplates/list`)
    .then((response) => {
      var result = response.data.map(function(val){
        var site = `${global.HOST}/${val}`;
        return {uri: site}
      });
      console.log("result", result)
      this.setState({ uris: [...result] }, console.log('results from getURIs ', this.state.uris))
      //cb(source)
    }).catch(function(err) {
      console.log('There was an error(msg):', err);
    })  
=======
        preferencesAll: this.props.preferencesAll,
      }
      this.handlePress = this.handlePress.bind(this);
>>>>>>> siteselect
  }

  handlePress(index) {
    const { navigate } = this.props.navigation; 
<<<<<<< HEAD
    this.props.addSite(this.state.uris[index].uri);
    navigate('ShareScreen');
=======
    this.props.selectPreferences(index);
    navigate('ShareScreen');   
>>>>>>> siteselect
  }

  renderViews() {
    return this.props.preferencesAll.map((preference, index) => {
      const html = renderHtmlTemplate(preference);
      return (
        <View key={index} style={styles.slides}>
          <WebView style={{padding: 10, width:350 }}
            automaticallyAdjustContentInsets={false}
            scrollEnabled={true}
            scalesPageToFit={true}
            source={{html: html}}>
          </WebView>
          <Button title={'Submit'} onPress={this.handlePress.bind(this, index)} />
        </View>
      )
    })
  }

  render() {
    if(!!this.props.preferencesAll){
      return (
        <Swiper style={styles.wrapper} showsButtons>
          {this.renderViews()}
        </Swiper>
      ) 
    } else {
      return(<Text>Loading...</Text>)
    }
  }  
}

const styles = {
  wrapper: {},
  slides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addSite, selectPreferences}, dispatch)
};

const mapStateToProps = ({preferencesAll}) => {
  return {preferencesAll};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSite);

