import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SignUpForm from './SignUpForm';

export default class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
      <View style={styles.formContainer}>
        <SignUpForm navigation={this.props.navigation} />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8B8B7',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  }
})