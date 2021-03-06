import React, { Component } from 'react';
import { Button, StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import Expo from 'expo';
import config from '../../../config/config';
import firebase from '../../../database/firebase';
import { connect } from 'react-redux';
import { loginOrSignUpUser } from '../../actions/authActions';
import styles from '../../styles';
import Loading from '../Loading';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      isLoading: false,
    };

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
    this.navigateToGallery = this.navigateToGallery.bind(this);
  }

  navigateToGallery() {
    // this.props.rootNavigate('MainApp')
    this.setState({isLoading: true});
    setTimeout(() => {
      this.props.rootNavigate('MainApp')
      this.setState({isLoading: false});
    }, 1000);
  }

  async emailLogin(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.loginOrSignUpUser();
      this.navigateToGallery();
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
        this.navigateToGallery();

        // Build Firebase credential with Google access token
        const token = result.accessToken;
        const credential = firebase.auth.GoogleAuthProvider.credential(null, token);

        // Retrieve user information from firebase
        firebase.auth().signInWithCredential(credential)
          .then(user => {
            this.props.loginOrSignUpUser();
          });
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
      this.navigateToGallery();

      // Build Firebase credential with Facebook access token
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential)
        this.props.loginOrSignUpUser();
    }
  }

  render() {
    return (
      (this.props.auth.isFetching)
      ? (<Loading />) :
      (<KeyboardAvoidingView behavior="padding">
        <TextInput 
          placeholder=" email"
          placeholderTextColor="#B0BBBD"
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
          placeholder=" password"
          placeholderTextColor="#B0BBBD"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          onChangeText={text => this.setState( {password: text })}
          ref={(input) => this.passwordInput = input}
        />
        <TouchableOpacity onPress={this.handleEmailLogin} style={[styles.buttonCentered, styles.loginButton, styles.center]}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonCentered, styles.loginButton, styles.facebookButton]} onPress={this.handleFacebookLogin}>
          <Text style={styles.buttonText}>WITH FACEBOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonCentered, styles.loginButton, styles.googleButton]} onPress={this.handleGoogleLogin}>
          <Text style={styles.buttonText}>WITH GOOGLE</Text>
        </TouchableOpacity>
        {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
    </KeyboardAvoidingView>)
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { loginOrSignUpUser })(LoginForm);
