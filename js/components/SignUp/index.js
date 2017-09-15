import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SignUpForm from './SignUpForm';
import styles from '../../styles';

export default class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.mainContainer]}>
          <SignUpForm navigation={this.props.navigation} />
        </View>
      </View>
    )
  }
}

// <View style={[styles.headerContainer, styles.centered]}>
//   <View style={styles.header}>
//     <Text style={[styles.text, styles.title]}>Sign Up</Text>
//   </View>
// </View>