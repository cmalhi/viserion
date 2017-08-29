import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
      <View style={styles.formContainer}>
        <LoginForm />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87B59A',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
  }
})