import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

export default class ColorPalette extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const colors = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC',
      '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];

    const squares = colors.map((c, index) => {
      return(
        <TouchableHighlight key={index} onPress={() => {this.props.setColor(c)}}>
          <View style={[styles.item, {backgroundColor: c}]} />
        </TouchableHighlight>
      );
    });

    return(
      <View style={styles.container}>
        {squares}
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