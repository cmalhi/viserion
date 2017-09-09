import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
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
const io = require('socket.io-client');

import PresetPalettes from './PresetPalettes';

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    createLogger()
  )
);

const Stack = StackNavigator(
  {
    // Index: { screen: PresetPalettes },
    Index: { screen: HomeScreen },
    PresetPalettes: { screen: PresetPalettes },
    ThreeColorPicker: { screen: ThreeColorPicker },
    Template: { screen: ChooseLayout },
    Title: { screen: ChooseTitle },
    ConfirmSite: { screen: ConfirmSite },
    ShareScreen: { screen: SharedScreen },
    Keywords: { screen: ChooseKeywords },
    Image: { screen: ImageUploader },
    Saved: { screen: SavedPages },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    UserEdit: { screen: UserEdit },
    ColorPicker: { screen: ColorPicker },
    ColorModal: { screen: ColorModal },
    AddComponent: { screen: AddComponent },
    ChangeComponent: { screen: ChangeComponent },
  }
);

const AppNavigator = TabNavigator(
  {
    'Index': { screen: Stack },
    'Feed': { screen: SavedPages },
    'My Sites': { screen: SavedPages },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
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

export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);
