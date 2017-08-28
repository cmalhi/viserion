import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ShareScreen extends React.Component {
  constructor(props) {
    super(props);
    this.site = this.props.site;
    this.title = this.props.title;
    this.notify = this.notify.bind(this);
  };

  notify(selection, message) {
    if(selection === 'fb'){
      console.log('Notifying FaceBook Friends: ' + message);
    } else {
      console.log('Notifying Follower by tweet: ' + message);
    }
  }

  render() {
    var message = 'Come checkout my new site called '+ this.title +  
     '. Here is the link '+ this.site +'.';
    return (
      <View style={styles.container}>
        <Text style={styles.screenName}>SHARE</Text>
        <View style={styles.message}>
          <Text>{message}</Text>
        </View>
        <View>
          <TouchableHighlight onPress={this.notify.bind(this, selection='tweet', message)}>
            <Image style={styles.images} source={require('../../images/twitter.png')} /> 
          </TouchableHighlight >
          <TouchableHighlight onPress={this.notify.bind(this, selection='fb', message)}> 
            <Image style={styles.images} source={require('../../images/fb.jpg')} />
          </TouchableHighlight>                 
        </View>      
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenName: {
    color: 'blue', 
    fontWeight: 'bold', 
    fontSize: 30
  },
  images: {
    width: 50,
    height: 50,
  },
  highlight: {
    opacity: 0.5,
  },
  messsage: {
    borderWidth: 2,
    backgroundColor: 'powderblue'
  }
})

const mapStateToProps = ( {title, site}) => {
  return { title, site }
}

export default connect(mapStateToProps)(ShareScreen);

