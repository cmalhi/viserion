import React from 'react';
import { Platform, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
const io = require('socket.io-client');
import Login from './Login/index.js';
import SignUp from './SignUp/index.js';

export default TabNavigator(
  {
    // 'Index': { screen: Stack },
    'Login': { screen: Login },
    'SignUp': { screen: SignUp },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: navigation.state.routeName,
    }),
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 24,
        lineHeight: 26,
      },
      activeBackgroundColor: '#222A3C',
      inactiveBackgroundColor: '#060E22',
      activeTintColor: '#FFF',
      style: {
        height: 35,
        backgroundColor: '#222A3C',
      },
    },
  }
);
