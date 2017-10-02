import React from 'react';
import { Alert, AppRegistry, Button, ListView, Text, TouchableOpacity, View, StyleSheet, AsyncStorage, TouchableHighlight, ScrollView } from 'react-native';
import styles from '../../styles';

export default class PresetPalettes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: null
    };
  }

  render() {
    return (
      <View style={[styles.container, styles.inverse, {marginBottom: 30, marginTop: 40}]}>
        <Text syle={{color: '#ffffff'}}>TOGGLED TEXT FONT CHANGER COMPONENT</Text>
      </View>
    )
  }
}

