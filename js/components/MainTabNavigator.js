import React from 'react';
import { Platform, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import ThreeColorPicker from './ThreeColorPicker';
import ChooseTitle from './ChooseTitle';
import ChooseLayout from './ChooseLayout/index';
import ChooseKeywords from './ChooseKeywords';
import ConfirmSite from './ConfirmSite';
import ImageUploader from './ImageUploader';
import SavedPages from './SavedPages';
import SharedScreen from './ShareScreen';
import Login from './Login/index';
import SignUp from './SignUp/index';
import UserEdit from './UserEdit';
import ColorPicker from './modals/ColorPicker';
import ColorModal from './modals/ColorModal';
import AddComponent from './AddComponent_deprecated';
import ChangeComponent from './ChangeComponent';
import HomeScreen from './HomeScreen';
import MyPages from './MyPages';
import { Ionicons } from '@expo/vector-icons';
import MainTabNavigator from './MainTabNavigator';
const io = require('socket.io-client');

export default TabNavigator(
  {
    // 'Index': { screen: Stack },
    'Feed': { screen: SavedPages },
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
          case 'Feed':
            iconName = Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts';
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
        height: 30,
      },
    },
    // tabBarComponent: props => {
    //   const backgroundColor = 'red';
    //   return (
    //     <TabView.TabBarTop
    //       {...props}
    //       style={{ backgroundColor }}
    //     />
    //   )
    // },
  }
);
