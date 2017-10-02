import React from 'react';
import { Alert, AppRegistry, Button, ListView, Text, TouchableOpacity, View, StyleSheet, AsyncStorage, TouchableHighlight, ScrollView } from 'react-native';
import styles from '../../styles';

export default class PresetPalettes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: this.props.data.size,
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  increase() {
    var size = this.state.fontSize;
    size += 1;
    this.setState({fontSize: size});
  }
  decrease() {
    var size = this.state.fontSize;
    size -= 1;
    this.setState({fontSize: size});
  }
  render() {
    return (
      <View style={[{marginBottom: 30, marginTop: 40}]}>
        <Button onPress={this.increase} title={'+'}/>
        <Button onPress={this.decrease} title={'-'}/>
        <Text>Font Size: {this.state.fontSize}</Text>
        <Button onPress={()=>{this.props.setTextSize(this.state.fontSize)}} title={'Set Font Size'}/>
      </View>
    )
  }
}

