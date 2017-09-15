import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoginForm from './LoginForm';
import styles from '../../styles';
import { connect } from 'react-redux'; 

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <LoginForm 
            rootNavigate={this.props.screenProps.rootNavigate} />
        </View>
      </View>
    );
  }
}
// <View style={[styles.headerContainer, styles.centered]}>
//   <View style={styles.header}>
//     <Text style={[styles.text, styles.title]}>Log In</Text>
//   </View>
// </View>

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Login);