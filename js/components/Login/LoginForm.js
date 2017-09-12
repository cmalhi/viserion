import React, { Component } from 'react';
import { Button, StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import Expo from 'expo';
import config from '../../../config/config';
import firebase from '../../../database/firebase';
import { connect } from 'react-redux';
import { loginOrSignUpUser } from '../../actions/authActions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // const { navigate } = this.props.navigation;
    // nextProps.auth.isLoggedIn && navigate('Template')
  }

  async emailLogin(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.loginOrSignUpUser();
      const { navigate } = this.props.navigation;
      navigate('Template');
      const user = firebase.auth().currentUser;
    } catch (error) {
      const errorMessage = error.toString();
      this.setState({ errorMessage });
      console.log(errorMessage);
    }
  }

  handleEmailLogin() {
    this.emailLogin(this.state.email, this.state.password);
  }

  async handleGoogleLogin() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: config.google.androidClientId,
        iosClientId: config.google.iosClientId,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        this.setState({
          email: '',
          password: '',
        });
        // Navigate to next page
        const { navigate } = this.props.navigation;
        navigate('Template');

        // Build Firebase credential with Google access token
        const token = result.accessToken;
        const credential = firebase.auth.GoogleAuthProvider.credential(null, token);

        // Retrieve user information from firebase
        firebase.auth().signInWithCredential(credential)
          this.props.loginOrSignUpUser();
      } else {
        console.log('Google Log in cancelled');
      }
    } catch(error) {
      console.log('Error with google login', error);
    }
  }

  async handleFacebookLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      config.facebook.APP_ID, { permissions: ['public_profile', 'email'] });
    if (type === 'success') {
      this.setState({
        email: '',
        password: '',
      });
      const { navigate } = this.props.navigation;
      navigate('Template');

      // Build Firebase credential with Facebook access token
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential)
        this.props.loginOrSignUpUser();
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput 
          placeholder="email"
          returnKeyType="next"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          ref={(input) => this.emailInput = input}
          onChangeText={text => this.setState( { email: text })}
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <TextInput
          placeholder="password"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          onChangeText={text => this.setState( {password: text })}
          ref={(input) => this.passwordInput = input}
        />
      <TouchableOpacity onPress={this.handleEmailLogin} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonContainer, styles.buttonFacebook]} onPress={this.handleFacebookLogin}>
        <Text style={styles.buttonText}>LOGIN WITH FACEBOOK</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonContainer, styles.buttonGoogle]} onPress={this.handleGoogleLogin}>
        <Text style={styles.buttonText}>LOGIN WITH GOOGLE</Text>
      </TouchableOpacity>
      {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 35,
    backgroundColor: 'rgba(225,225,225,0.4)',
    marginVertical: 5,
    color: '#000',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#F7FFFB',
    paddingVertical: 10,
    marginVertical: 5,
  },
  buttonFacebook: {
    backgroundColor: '#4997FF',
  },
  buttonGoogle: {
    backgroundColor: '#FF2B4E',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { loginOrSignUpUser })(LoginForm);
