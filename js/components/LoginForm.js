import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Button } from 'react-native';
import Expo from 'expo';
import firebase from '../firebase';


export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    }

    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
  }

  handleFacebookLogin = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '736407226550495', {
      permissions: ['public_profile'],
    });
      
    if (type === 'success') {
      
      // Build Firebase credential with Facebook access token
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase.auth().signInWithCredential(credential)
        .then((sucess) => {
          var user = firebase.auth().currentUser;
          if (user) {
            console.log('user information is:', user);
            const { navigate } = this.props.navigation;

            this.setState({
              email: '',
              password: '',
            })
            
            navigate('Template');
            // User is signed in.
          } else {
            console.log('No user signed in')
          }
        })
        .catch((error) => {
        console.log('FB firebase Login error', error);
      });

      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      console.log(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  // Object {
  //   "displayName": null,
  //   "email": "55@55.com",
  //   "phoneNumber": null,
  //   "photoURL": null,
  //   "providerId": "password",
  //   "uid": "55@55.com",

  emailLogin = async (email, password) => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '736407226550495', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );
      await firebase.auth()
        .signInWithEmailAndPassword(email, password);

      const user = firebase.auth().currentUser;
      if (user) {
        console.log('user information is:', user);
        // AsyncStorage.setItem('username': user.providerData.email);
        // AsyncStorage.setItem('token': user.stsTokenManager.accessToken);
        // AsyncStorage.setItem('uid': user.uid);

        this.setState({
          email: '',
          password: '',
        })

        // Navigate to next page
        const { navigate } = this.props.navigation;
        navigate('Template');

      } else {
        // No user is signed in.
        console.log('No user signed in');
      }
    } catch (error) {
      const errorMessage = error.toString();
      this.setState({ errorMessage: errorMessage });
      console.log(errorMessage);
    }
  }

  handleEmailLogin() {
    this.emailLogin(this.state.email, this.state.password)
  }

  // TO DO: Configure google credentialsS
  handleGoogleLogin = async () => {
    try {
        const result = await Expo.Google.logInAsync({
          androidClientId: YOUR_CLIENT_ID_HERE,
          iosClientId: YOUR_CLIENT_ID_HERE,
          scopes: ['profile', 'email'],
        });

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }> 
        <TextInput 
          placeholder="email"
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
          returnKeyType="go"
          secureTextEntry
          style={ styles.input }
          ref={ (input) => this.passwordInput = input }
        />
      <TouchableOpacity onPress={this.handleEmailLogin} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <Button
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}
      />
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