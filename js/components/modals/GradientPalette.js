import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';

export default class ColorPalette extends React.Component {
  constructor(props) {
    super(props);
  }
  //translate the boxes -90 deg to match gradient direction
  render() {
    const colors = [{color1: '#00b09b', color2: '#96c93d'}, {color1: '#D3CCE3', color2: '#E9E4F0'}, 
    {color1: '#e1eec3', color2: '#f05053'}, {color1: '#74ebd5', color2: '#ACB6E5'}, {color1: '#22c1c3', color2: '#fdbb2d'}, 
    {color1: '#ff9966', color2: '#ff5e62'}, {color1: '#7F00FF', color2: '#E100FF'}, {color1: '#C9D6FF', color2: '#E2E2E2'},
    {color1: '#d9a7c7', color2: '#fffcdc'}, {color1: '#396afc', color2: '#2948ff'}, {color1: '#0cebeb', color2: '#29ffc6'},
    {color1: '#36D1DC', color2: '#5B86E5'},];

    const squares = colors.map((c, index) => {
      return(
        <TouchableHighlight key={index} onPress={() => {this.props.setColor({color1: c.color1, color2: c.color2})}}>
        <View>
          <LinearGradient
            colors={[c.color1, c.color2]}
            style={{ height: 60, width: 60, margin: 5, borderRadius: 3 }}
          >
          </LinearGradient>
          </View>
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
