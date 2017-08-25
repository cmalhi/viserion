import React from 'react'
import {
  Text,
  View,
  WebView
} from 'react-native'
import Swiper from 'react-native-swiper'

var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22965A'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#910F66'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4BBD4'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

var source =  [{uri: 'http://google.com'},{uri: 'http://spotify.com'},{uri: 'http://nfl.com'},{uri: 'http://cnn.com'}];

export default class ConfirmSite extends React.Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons>
        <View style={styles.slide1}>
          <WebView style={{padding: 20, width:400}}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={true}
          source={source[0]}>
         </WebView>
        </View>
        <View style={styles.slide2}>
          <WebView style={{padding: 20, width:400}}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={true}
          source={source[1]}>
          </WebView>
        </View>
        <View style={styles.slide3}>
          <WebView style={{padding: 20, width:400}}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={false}
          source={source[2]}>
          </WebView>
        </View>
        <View style={styles.slide4}>
         <WebView style={{padding: 20, width:400}}
          automaticallyAdjustContentInsets={false}
          scrollEnabled={false}
          source={source[3]}>
          </WebView>
        </View>
      </Swiper>
    )
  }
}