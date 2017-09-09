import React from 'react';
import { Alert, AppRegistry, Button, ListView, Text, TouchableOpacity, View, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addColors } from '../actions/index';
import CircularColorPalette from './CircularColorPalette';

class PresetPalettes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColors: {},
    };
    this.colors = ['#F34336', '#E81E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F2', '#03A9F3', '#00BCD3', '#009688', '#4CAF50', '#8BC24A', '#CCDB39', '#FEEA3B', '#FEC007', '#FE9800', '#FE5722', '#795548', '#9E9E9E', '#607D8B'];
    this.submitColor = this.submitColor.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(color) {
    const selected = this.state.selectedColors[color] ? false : true;
    const newSelectedColors = Object.assign({}, this.state.selectedColors, { [color]: selected });
    this.setState({ selectedColors: newSelectedColors }, console.log('selectedColors', this.state.selectedColors));
  }

  submitColor() {
    const { navigate } = this.props.navigation;
    // TODO refactor/clean up later
    let chosenColors = [];
    for (color in this.state.selectedColors) {
      if (this.state.selectedColors[color] === true) {
        chosenColors.push(color)
      }
    }
    this.props.addColors(chosenColors);
    navigate('Keywords')
  }

  // Blue: #99d3df, #88bbd6, #52658f
  // Yellow: #f2b632
  render() {
    const { navigate } = this.props.navigation;
    const circles = this.colors.map((color, i) => {
      return (
        <TouchableOpacity
          key={'color' + i}
          style={this.state.selectedColors[color] && styles.selected}
          onPress={this.handlePress.bind(this, color)}
        >
          <CircularColorPalette colors={ [color] } />
        </TouchableOpacity>
      )
    });
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View>
            <Text style={styles.big}>Pick any colors you like.</Text>
            <Text style={styles.small}>We'll use these to craft your page.</Text>
            <Text onPress={() => { navigate('ThreeColorPicker')}}>Or use our custom color picker</Text>
          </View>
          {circles}
        </ScrollView>
        <Button title="Continue" onPress={this.submitColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    // maxHeight: 20,
    flexWrap: 'wrap',
  },
  big: {
    fontSize: 30,
  },
  small: {
    fontSize: 20,
  },
  selected: {
    backgroundColor: '#aaa',
  },
});

function mapStateToProps({ colors }) {
  return { colors };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({addColors}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(PresetPalettes);
