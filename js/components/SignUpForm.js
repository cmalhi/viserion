import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Button, AsyncStorage } from 'react-native';
import Expo from 'expo';
import firebase from '../../config/firebase';

export default class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    }

    this.handleSignUp = this.handleSignUp.bind(this);
    this.signup = this.signup.bind(this);
  }

  signup = async (email, password) => {
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(email, password);
        // console.log("Account created");
        var user = firebase.auth().currentUser;
        if (user) {

          user.getIdToken()
            .then(IdToken => {
              AsyncStorage.multiSet([['username', user.providerData[0].email], ['token', IdToken], ['userId', user.uid]])
            })
          
          this.setState({
            email: '',
            password: '',
          })

          const { navigate } = this.props.navigation;
          navigate('Template');

        } else {
          console.log('No user signed in')
        }

    } catch (error) {
      const errorMessage = error.toString();
      this.setState({ errorMessage });
      console.log(errorMessage);
    }
  }

  handleSignUp() {
    this.signup(this.state.email, this.state.password);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }> 
        <TextInput 
          placeholder="email"
          value={ this.state.email }
          returnKeyType="next"
          keyboardType="email-address"
          style={ styles.input }
          autoCapitalize="none"
          autoCorrect={false}
          ref={ (input) => this.emailInput = input }
          onChangeText={text => this.setState( { email: text })}
          onSubmitEditing={ () => this.passwordInput.focus() }
        />
        <TextInput
          placeholder="password"
          value={ this.state.password }
          returnKeyType="go"
          secureTextEntry
          style={ styles.input }
          onChangeText={text => this.setState( { password: text })}
          ref={ (input) => this.passwordInput = input }
        />
      <TouchableOpacity onPress={this.handleSignUp} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      { this.state.errorMessage && <Text>{this.state.errorMessage}</Text> }
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
    backgroundColor: 'rgba(225,225,225,0.4)',
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