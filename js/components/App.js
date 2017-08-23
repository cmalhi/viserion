import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';
import ChooseColor from './ChooseColor';
import PageScreen from './PageScreen';
import ChooseTitle from './ChooseTitle';
import ChooseLayout from './ChooseLayout';
import ConfirmSite from './ConfirmSite';

const store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger()
  ),
);

class HomeScreen extends React.Component {
  render() {
    console.log('this.props', this.props);
    const { navigate } = this.props.navigation;
    // console.log('navigate', navigate);
    return (
      <ScrollView>
        <Button onPress={() => { navigate('Color')}} title="Color" />
        <Button onPress={() => { navigate('Template')}} title="Template" />
        <Button onPress={() => { navigate('Page')}} title="Page" />
        <Button onPress={() => { navigate('Title')}} title="Title" />
        <Button onPress={() => { navigate('ConfirmSite')}} title="Confirm Site" />
      </ScrollView>
    )
  }
}

const AppNavigator = StackNavigator({
  Index: { screen: HomeScreen },
  Color: { screen: ChooseColor },
  Title: { screen: ChooseTitle },
  Template: { screen: ChooseLayout },
  Page: { screen: PageScreen },
  ConfirmSite: { screen: ConfirmSite },
});

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
});

export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
  );