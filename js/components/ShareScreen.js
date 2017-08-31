import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Share } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
const key = require('../../config/apiKeys').urlShortner;


class ShareScreen extends React.Component {
  constructor(props) {
    super(props);
    this.site = this.props.site;
    this.title = this.props.title;
    this.notify = this.notify.bind(this);
    this.state = {
      site: ''
    }
  };

  notify(selection, mes) {
    axios.post(`https://www.googleapis.com/urlshortener/v1/url?key=${key}`,{"longUrl": this.site})
    .then((response) => {
      Share.share({
        message: mes,
        url: response.data.id,
        title: this.title
      })
    });
  }  

  render() {
    var message = 'Come checkout my new site called '+ this.title +
     '. Here is the link '+ this.site +'.';
    return (
      <View style={styles.container}>
        <Text style={styles.screenName}>SHARE</Text>
        <View style={styles.message} >
          <Text>{message}</Text>
        </View>  
        <TouchableHighlight onPress={this.notify.bind(this, selection='', message)}>
          <View style={styles.icons} >
            <Image style={styles.image} source={require('../../images/twitter.png')} />
            <Image style={styles.image} source={require('../../images/slack.jpeg')} />
            <Image style={styles.image} source={require('../../images/fb.jpg')} />
            <Image style={styles.image} source={require('../../images/email.jpg')} />
          </View>  
        </TouchableHighlight>             
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  screenName: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30
  },
  image: {
    width: 50,
    height: 50,
  },
  highlight: {
    opacity: 0.5,
  },
  messsage: {
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
 
})

const mapStateToProps = ( {title, site}) => {
  return { title, site }
}

export default connect(mapStateToProps)(ShareScreen);

