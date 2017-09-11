import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

export default class CircularColorPalette extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const circles = this.props.colors.map((c, index) => {
      return(
        <View key={index} style={[styles.item, {backgroundColor: c}]} />
      );
    });

    return(
      <View style={styles.container}>
        {circles}
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  item: {
    height: 100,
    width: 100,
    borderRadius: 200,
    margin: 5,
  },
  selected: {
    borderWidth: 10,
  },
});