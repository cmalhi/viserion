import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default () => <AppNavigator />;

class TemplateScreen extends React.Component {
  render() {
    return <Text>Choose a template!</Text>
  }
}

class ColorScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Choose a color!</Text>
      </View>
    )
  }
}

class HomeScreen extends React.Component {
  render() {
    console.log('this.props', this.props);
    const { navigate } = this.props.navigation;
    // console.log('navigate', navigate);
    return (
      <ScrollView>
        <Button onPress={() => { navigate('Color')}} title="Color" />
        <Button onPress={() => { navigate('Template')}} title="Template" />
      </ScrollView>
    )
  }
}

const AppNavigator = StackNavigator({
  Index: { screen: HomeScreen },
  Color: { screen: ColorScreen },
  Template: { screen: TemplateScreen }
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