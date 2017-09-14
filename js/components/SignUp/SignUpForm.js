import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import Expo from 'expo';
import firebase from '../../../database/firebase';
import { loginOrSignUpUser } from '../../actions/authActions';
import styles from '../../styles';

class SignUpForm extends Component {
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

  async signup(email, password) {
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(email, password);
      this.props.loginOrSignUpUser();
      const { navigate } = this.props.navigation;
      navigate('Template');
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
      <KeyboardAvoidingView behavior="padding"> 
        <TextInput
          placeholder=" email"
          placeholderTextColor="#B0BBBD"
          value={this.state.email}
          returnKeyType="next"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          ref={(input) => this.emailInput = input}
          onChangeText={text => this.setState({ email: text })}
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <TextInput
          placeholder=" password"
          placeholderTextColor="#B0BBBD"
          value={this.state.password}
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          ref={(input) => this.passwordInput = input}
        />
        <TouchableOpacity onPress={this.handleSignUp} style={[styles.buttonCentered, styles.loginButton, styles.center]}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
    </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
};

export default connect(mapStateToProps, { loginOrSignUpUser })(SignUpForm);