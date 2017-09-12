import React from 'react';
import { Dimensions, Text, View , Image} from 'react-native';
import styles from '../styles';

export default class Prescreen extends React.Component {
  render(){
    return(
      <View style={[styles.container, {backgroundColor: '#222A3C'}]}>
        <View style={[styles.mainContainer, styles.centered]}>
          <Text style={{color: '#fff', fontFamily: 'AvenirNext-Regular', fontSize: 37}}>QuikPages</Text>
        </View>
        <View style={{flex: 1}}>
          <Image
            style={{width: Dimensions.get('window').width, height: 200}}
            source={require('../../assets/wave.png')}
          />
        </View>
      </View>
    )
  }
}

// export const Prescreen = () => (
//   <View>Hello</View>
// );
