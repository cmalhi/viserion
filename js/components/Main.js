import React from 'react';
import { StatusBar, Platform, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appendPrefs, updatePrefs } from '../actions/index';
import RootNavigator from './RootNavigator';
import { Font } from 'expo';
const io = require('socket.io-client');

class Main extends React.Component{
  componentDidMount() {
    // All sockets go here
    const socket = io(global.HOST, { transports: ['websocket'] });
    socket.on('addPrefDomStore', (addition) => {
      this.props.appendPrefs(addition)
    });
    socket.on('updatePrefDomStore', (newPrefs) => {
      this.props.updatePrefs(newPrefs)
    });
  }

  render() {
    // StatusBar.setBarStyle('light-content', 'true');
    return(
      <View style={{flex: 1 }}>
        <View style={{flex: 1, height: 50, backgroundColor: '#000'}}></View>
        <StatusBar
          barStyle="light-content"
        />
        <View style={{ flex: 30 }}>
          <RootNavigator />
        </View>
      </View>
    )
  }
}

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ appendPrefs, updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Main);