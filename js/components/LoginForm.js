import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Button } from 'react-native';


export default class LoginForm extends Component {

  handleLogin() {
    console.log('Login Clicked')
  }

  handleFacebookLogin = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('736407226550495', {
          permissions: ['public_profile'],
    });
      
    console.log('handleFacebookLogin');
    if (type === 'success') {
      
      // Build Firebase credential with Facebook access token
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log('FB Login error', err);
      });

      console.log('fb credential', credential);

      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  handleUsernameLogin = async (email, password) => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        '736407226550495', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

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
          placeholder="username or email"
          returnKeyType="next"
          keyboardType="email-address"
          style={ styles.input }
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={ () => this.passwordInput.focus() }
        />
        <TextInput
          placeholder="password"
          returnKeyType="go"
          secureTextEntry
          style={ styles.input }
          ref={ (input) => this.passwordInput = input }
        />
      <TouchableOpacity onPress={this.handleLogin} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <Button
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}
      />
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