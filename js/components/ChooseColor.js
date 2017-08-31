import React from 'react';
import { Alert, AppRegistry, Button, ListView, Text, TouchableHighlight, View, StyleSheet, AsyncStorage } from 'react-native';
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
      chosenColors: ['#FF0000', '#00FF00','#0000FF'],
      color1: '#FF0000',
      color2: '#00FF00',
      color3: '#0000FF',
      currentColor: '#F00',
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
    if (this.state.currentTab === 1){
      this.setState({color1: this.state.currentColor})
      this.setState({chosenColors: [this.state.color1, this.state.color2, this.state.color3]})
    } else if (this.state.currentTab === 2) {
      this.setState({color2: this.state.currentColor})
      this.setState({chosenColors: [this.state.color1, this.state.color2, this.state.color3]})
    } else if (this.state.currentTab === 3){
      this.setState({color3: this.state.currentColor})
      this.setState({chosenColors: [this.state.color1, this.state.color2, this.state.color3]})
    }
  }

  submitColor() {
    const { navigate } = this.props.navigation;
    this.props.addColors(this.state.chosenColors);
    console.log('chosen colors', this.state.chosenColors);
    navigate('Keywords')
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
 
  }

  render() {
    return (
  <View style={{flex: 1, padding: 15, backgroundColor: '#FFFFFF'}}>
    <Text style={{color: 'white'}}>React Native Color Picker - Uncontrolled</Text>
    <ColorPicker
      defaultColor={this.state.currentColor}
      onColorChange={this.onColorChange}
      style={{flex: 1}}
    />
    <View style={styles.container}>
      <TouchableHighlight>
        <View 
          style={{backgroundColor: this.state.color1, height: 25, width: 90, marginTop: 10}}
        ><Button onPress={this.handleClick.bind(this, this.state.color1, 1)} title=""></Button></View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View 
          style={{backgroundColor: this.state.color2, height: 25, width: 90, marginTop: 10}}
        ><Button onPress={this.handleClick.bind(this, this.state.color2, 2)} title=""></Button></View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View 
          style={{backgroundColor: this.state.color3, height: 25, width: 90, marginTop: 10}}
        ><Button onPress={this.handleClick.bind(this, this.state.color3, 3)} title=""></Button></View> 
        </TouchableHighlight>
    </View>
    <Button
      onPress={this.submitColor}
      title="Submit These Colors"
      color='#000'
    ></Button>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 20,
  },
  selected: {
    opacity: 0.5,
    backgroundColor: '#0F0',
    maxHeight: 20
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
