import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default class ChooseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      template: '',
    }

    this.handleTemplateClick = this.handleTemplateClick.bind(this);
  }

  handleTemplateClick() {
    this.setState({template: ''});
    console.log('template clicked');
  }

  render() {
    console.log('rendered');
    return (
      <View style={styles.container}>
        <Text>Choose a Layout</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 400,
  },
  template: {
    width: 150,
    height: 100,
  }
});
