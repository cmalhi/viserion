import React from 'react';
import { Platform, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import Main from './Main'

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    createLogger()
  )
);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);


