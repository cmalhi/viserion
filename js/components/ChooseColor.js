import React from 'react';
import { Alert, AppRegistry, Button, ListView, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addColors } from '../actions/index';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

class ChooseColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#FF0000',
      count: 0,
      chosenColors: ['#222', '#222','#222'],
      color1: '#F00',
      color2: '#0F0',
      color3: '#00F',
      currentColor: '#000',
      currentTab: 1,
    };
    this.onColorChange = this.onColorChange.bind(this);
    this.submitColor = this.submitColor.bind(this);
    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(color, tab) {
    console.log('click handled')
    this.setState({currentColor: color})
    this.setState({currentTab: tab})
  }
 
  onColorChange(color) {
    color = fromHsv(color);
    this.setState({currentColor: color}, ()=>{console.log('current color is ', this.state.currentColor)})
  }

  submitColor() {
    this.props.addColors(this.state.chosenColors);
  }

  setCurrentTab() {
    console.log('setting current color')
    if (this.state.currentTab === 1){
      this.setState({color1: this.state.currentColor})
    } else if (this.state.currentTab === 2) {
      this.setState({color2: this.state.currentColor})
    } else if (this.state.currentTab === 3){
      this.setState({color3: this.state.currentColor})
    }

  }

  componentDidMount() {
    console.log('mount')
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
  <View style={{flex: 1, padding: 15, backgroundColor: '#FFFFFF'}}>
    <Text style={{color: 'white'}}>React Native Color Picker - Uncontrolled</Text>
    <ColorPicker
      onColorChange={this.onColorChange}
      style={{flex: 1}}
    />
    <Button
      onPress={this.setCurrentTab}
      title="THIS COLOR"
      color={this.state.currentColor}
    ></Button>
    <View style={styles.container}>
      <TouchableHighlight>
        <View 
          style={{backgroundColor: this.state.color1, height: 15, width: 90}}
        ><Button onPress={this.handleClick.bind(this, this.state.color1, 1)} title=""></Button></View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View 
          style={{backgroundColor: this.state.color2, height: 15, width: 90}}
        ><Button onPress={this.handleClick.bind(this, this.state.color2, 2)} title=""></Button></View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View 
          style={{backgroundColor: this.state.color3, height: 15, width: 90}}
        ><Button onPress={this.handleClick.bind(this, this.state.color3, 3)} title=""></Button></View> 
        </TouchableHighlight>
    </View>
    <Button
      onPress={this.submitColor}
      title="Submit deez colors"
      color={this.state.currentColor}
    ></Button>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 20,
  },
  selected: {
    opacity: 0.5,
    backgroundColor: '#0F0'
  },
  linebreak: {
    width: '100%',
  },
  template: {
    width: 95,
    height: 15,
    borderColor: 'grey',
  }
});

function mapStateToProps({ colors }) {
  return { colors };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({addColors}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ChooseColor);
