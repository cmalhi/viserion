import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoginForm from './LoginForm';
import styles from '../../styles';

export default class LoginSignUpSplash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.headerContainer, styles.centered]}>
          <View style={styles.header}>
            <Text style={[styles.text, styles.title]}>Log In</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
