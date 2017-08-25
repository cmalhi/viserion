import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import ChooseColor from './ChooseColor';
import ChooseTitle from './ChooseTitle';
import ChooseLayout from './ChooseLayout';
import ConfirmSite from './ConfirmSite';
import PageScreen from './PageScreen';
import ImageUploader from './ImageUploader';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    createLogger()
  ),
);

class HomeScreen extends React.Component {
  render() {
    console.log('this.props', this.props);
    const { navigate } = this.props.navigation;
    // console.log('navigate', navigate);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create a page</Text>
        <Text onPress={() => { navigate('Template')}} style={styles.defaultText,styles.selectedText}>Step 1: Template</Text>
        <Text onPress={() => { navigate('Color')}} style={styles.defaultText,styles.selectedText}>Step 2: Color</Text>
        <Text onPress={() => { navigate('Title')}} style={styles.defaultText,styles.selectedText}>Step 3: Title</Text>
        <Text onPress={() => { navigate('ConfirmSite')}} style={styles.defaultText,styles.selectedText}>Step 4: Confirm Selection</Text>
        <Text onPress={() => { navigate('Page')}} style={styles.defaultText,styles.selectedText}>Final Page</Text>
        <Text onPress={() => { navigate('Image')}} style={styles.defaultText,styles.selectedText}>(Optional) Add Image</Text>
      </View>
    )
  }
}

const AppNavigator = StackNavigator({
  Index: { screen: HomeScreen },
  Color: { screen: ChooseColor },
  Template: { screen: ChooseLayout },
  Title: { screen: ChooseTitle },
  ConfirmSite: { screen: ConfirmSite},
  Page: { screen: PageScreen },
  Image: { screen: ImageUploader },
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  defaultText: {

  },
  selectedText: {
    backgroundColor: 'yellow',
  }
});

export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
  );
