import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

export default class ColorPalette extends React.Component {
  constructor(props) {
    super(props);
    this.selectColor = this.selectColor.bind(this);
  }

  selectColor() {
    console.log('color selected');
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#FF6900'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#FCB900'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#7BDCB5'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#00D084'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#8ED1FC'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#0693E3'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#ABB8C3'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#EB144C'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#F78DA7'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.color, {backgroundColor: '#9900EF'}]} />
        </TouchableHighlight>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
  },
  color: {
    flex: 1,
    width: 60,
    borderRadius: 3,
    margin: 5,
  },
});