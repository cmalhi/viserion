import React from 'react';
import { Text, TouchableHighlight, Image } from 'react-native';

export default class RowComponent extends React.Component {
  render() {
    return (

      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.text}</Text>
      </TouchableHighlight>
    )
  }
}