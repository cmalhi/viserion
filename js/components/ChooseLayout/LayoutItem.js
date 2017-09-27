import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import React from 'react';

const LayoutItem = (props) => {
  return (
    <TouchableHighlight
      activeOpacity={1.0}
      style={styles.templateContainer}
      onPressIn={layout => props.handleLayoutPress(props.layout)}>
      <Image
        style={styles.template}
        source={props.layout.uri}/>
    </TouchableHighlight >
  );
};

export default LayoutItem;

const styles = StyleSheet.create({
  templateContainer: {
    alignSelf: 'center',
  },
  template: {
    width: 270,
    height: 400,
    borderRadius: 5,
  },
});
