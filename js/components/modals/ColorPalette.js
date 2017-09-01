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
          <View style={[styles.item, {backgroundColor: '#FF6900'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#FCB900'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#7BDCB5'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#00D084'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#8ED1FC'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#0693E3'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#ABB8C3'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#EB144C'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#F78DA7'}]} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.selectColor}>
          <View style={[styles.item, {backgroundColor: '#9900EF'}]} />
        </TouchableHighlight>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  item: {
    height: 60,
    width: 60,
    borderRadius: 3,
    margin: 5,
  },
});