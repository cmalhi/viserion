import React from 'react'
import {Text, View} from 'react-native'
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

export default class ConfirmSite extends React.Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons>
        <View style={styles.slide1}>
          <Text style={styles.text}>Option 1</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Option 2</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Option 3</Text>
        </View>
        <View style={styles.slide4}>
          <Text style={styles.text}>Option 4</Text>
        </View>
      </Swiper>
    )
  }
}