import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class SignUp extends Component {
  render() {
    return (
      <View style={ styles.container }> 
        <TextInput 
          style={styles.input}
        />
        <TextInput
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  }
})