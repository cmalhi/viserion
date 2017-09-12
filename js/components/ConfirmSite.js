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
import { selectSite, selectPreferences } from '../actions/index';
import axios from 'axios';
import prefToReactify from '../../app/utils/prefToReactify';


class ConfirmSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preferencesAll: this.props.preferencesAll,
    }
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(index) {
    const { navigate } = this.props.navigation; 
    this.props.selectPreferences(index);
    navigate('UserEdit');
  }
 
  renderViews() {
    return this.props.preferencesAll.map((preference, index) => {
      const html = prefToReactify(preference);
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
  return bindActionCreators({selectSite, selectPreferences}, dispatch)
};

const mapStateToProps = ({preferencesAll}) => {
  return {preferencesAll};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSite);

