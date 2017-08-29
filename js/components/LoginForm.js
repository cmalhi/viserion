import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';


export default class LoginForm extends Component {
  render() {
    return (
      <View style={ styles.container }> 
        <TextInput 
          placeholder="username or email"
          style={ styles.input }
        />
        <TextInput
          placeholder="password"
          secureTextEntry
          style={ styles.input }
        />

      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 35,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginVertical: 5,
    color: '#000',
    paddingHorizontal: 10
  }, 
  buttonContainer: {
    backgroundColor: '#F7FFFB',
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
})