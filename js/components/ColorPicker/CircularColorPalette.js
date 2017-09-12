import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import styles from '../../styles'

export default class CircularColorPalette extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const circles = this.props.colors.map((c, index) => {
      return(
        <View key={index} style={[styles.circle, {backgroundColor: c}]} />
      );
    });

    return(
      <View style={styles.circleContainer}>
        {circles}
      </View>
    )
  }
}
