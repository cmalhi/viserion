import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../../styles';
import LoginForm from './LoginForm';

export default class LoginSplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.headerContainer, styles.centered]}>
          <View style={[styles.header, styles.centered]}>
            <Text style={[styles.text, styles.title]}>Login To View Your Saved Sites</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <LoginForm
            rootNavigate={this.props.rootNavigate}
            />
        </View>
      </View>
    );
  }
}