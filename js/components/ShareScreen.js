import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Share } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ShareScreen extends React.Component {
  constructor(props) {
    super(props);
    this.site = this.props.site;
    this.title = this.props.title;
    this.notify = this.notify.bind(this);
  };

  notify(selection, mes) {
   Share.share({
     message: mes,
     url: this.site,
     title: this.title
   })
  }

  render() {
    var message = 'Come checkout my new site called '+ this.title +
     '. Here is the link '+ this.site +'.';
    return (
      <View style={styles.container}>
        <Text >SHARE</Text>
        <View style={styles.message} >
          <Text>{message}</Text>
          <View style={styles.icons} >
            <TouchableHighlight onPress={this.notify.bind(this, selection='tweet', message)}>
              <Image style={styles.image} source={require('../../images/twitter.png')} />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.notify.bind(this, selection='fb', message)}> 
              <Image style={styles.image}   source={require('../../images/fb.jpg')} />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.notify.bind(this, selection='email', message)}> 
              <Image style={styles.image} source={require('../../images/email.jpg')} />
            </TouchableHighlight>             
          </View>
        </View>      
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
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

