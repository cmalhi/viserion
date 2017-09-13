import React from 'react';
import { TriangleColorPicker } from 'react-native-color-picker';

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: 'red'
    }
  }

  render() {
    return(
      <TriangleColorPicker
        defaultColor={this.state.currentColor}
        onColorChange={this.onColorChange}
        style={{flex: 1}}
      />
    )
  }
}