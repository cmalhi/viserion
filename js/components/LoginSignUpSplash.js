import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles';
import LoginSignUpNavigator from './LoginSignUpNavigator';

export default class LoginSignUpSplash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.headerContainerSmall, styles.centered]}>
          <View style={[styles.header, styles.centered]}>
            <Text style={[styles.text, styles.subtitle]}>Sign Up or Login To Save and View Your Sites</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <LoginSignUpNavigator 
            screenProps={{ rootNavigate:this.props.navigation.state.params.rootNavigate }} />
        </View>
      </View>
    );
  }
}