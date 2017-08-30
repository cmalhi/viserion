import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Button } from 'react-native';
import Expo from 'expo';
import firebase from 'firebase';


export default class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }

  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }> 
        <TextInput 
          placeholder="username or email"
          returnKeyType="next"
          keyboardType="email-address"
          style={ styles.input }
          autoCapitalize="none"
          autoCorrect={false}
          ref={ (input) => this.usernameInput = input }
          onChangeText={text => this.setState( { username: text })}
          onSubmitEditing={ () => this.passwordInput.focus() }
        />
        <TextInput
          placeholder="password"
          returnKeyType="go"
          secureTextEntry
          style={ styles.input }
          onChangeText={text => this.setState( { password: text })}
          ref={ (input) => this.passwordInput = input }
        />
      <TouchableOpacity onPress={this.handleLogin} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginVertical: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  }
})