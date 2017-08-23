import React from 'react';
import { Alert, AppRegistry, Button, ListView, Text, TouchableHighlight, View, StyleSheet } from 'react-native';

export default class ChooseColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
    this.setColor = this.setColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setColor(color) {
    //Animate button so the user knows what theyre about to submit
    console.log('You pressed the', color, 'button');
    this.setState({color: color});
  }

  handleSubmit() {
    //Send data to DB
    console.log('Handle submit function. Color: ', this.state.color);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Choose a color ;)</Text>

        <View style={styles.linebreak} />

        <TouchableHighlight onPress={this.setColor.bind(this, 'blue')} >
          <View style={{width: 100, height: 100, backgroundColor: '#0070FF'}} />
        </TouchableHighlight>

        <TouchableHighlight onPress={this.setColor.bind(this, 'red')} >
          <View style={{width: 100, height: 100, backgroundColor: '#F02311'}} />
        </TouchableHighlight>

      </View>
    );
  }gg
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  linebreak: {
    width: '100%',
  }
});
