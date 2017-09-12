import React from 'react';
import { Platform, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import MyPages from './MyPages';
import Gallery from './Gallery';
import { Ionicons } from '@expo/vector-icons';
const io = require('socket.io-client');

export default TabNavigator(
  {
    // 'Index': { screen: Stack },
    'Gallery': { screen: Gallery },
    'My Sites': { screen: MyPages },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Index':
            iconName = Platform.OS === 'ios' ? `ios-home${focused ? '' : '-outline'}` : 'md-home';
            break;
          case 'Gallery':
            iconName = Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search';
            break;
          case 'My Sites':
            iconName = Platform.OS === 'ios' ? `ios-browsers${focused ? '' : '-outline'}` : 'md-browsers';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={20}
          />
        )
      }
    }),
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      // activeTintColor: '#e91e63',
      style: {
        height: 35,
        backgroundColor: 'white',
      },
    },
  }
);
