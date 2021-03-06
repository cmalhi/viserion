import React from 'react';
import { Alert, AppRegistry, Button, ListView, Text, TouchableHighlight, View, StyleSheet, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addColors } from '../../actions/index';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';

class ThreeColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#9ad3de',
      count: 0,
      chosenColors: ['#9ad3de', '#e3e3e3', '#89bdd3'],
      color1: '#9ad3de',
      color2: '#e3e3e3',
      color3: '#89bdd3',
      currentColor: '#9ad3de',
      currentTab: 1,
    };
    this.onColorChange = this.onColorChange.bind(this);
    this.submitColor = this.submitColor.bind(this);
    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(color, tab) {
    this.setState({currentColor: color});
    this.setState({currentTab: tab});
  }
 
  onColorChange(color) {
    color = fromHsv(color);
    this.setState({currentColor: color});
    if (this.state.currentTab === 1){
      this.setState({color1: this.state.currentColor});
      this.setState({chosenColors: [this.state.color1, this.state.color2, this.state.color3]})
    } else if (this.state.currentTab === 2) {
      this.setState({color2: this.state.currentColor});
      this.setState({chosenColors: [this.state.color1, this.state.color2, this.state.color3]})
    } else if (this.state.currentTab === 3){
      this.setState({color3: this.state.currentColor});
      this.setState({chosenColors: [this.state.color1, this.state.color2, this.state.color3]})
    }
  }

  submitColor() {
    const { navigate } = this.props.navigation;
    this.props.addColors(this.state.chosenColors);
    navigate('Keywords')
  }

  setCurrentTab() {
    if (this.state.currentTab === 1){
      this.setState({color1: this.state.currentColor})
    } else if (this.state.currentTab === 2) {
      this.setState({color2: this.state.currentColor})
    } else if (this.state.currentTab === 3){
      this.setState({color3: this.state.currentColor})
    }

  }

  render() {
    return (
      <View style={{flex: 1, padding: 15, backgroundColor: '#FFFFFF'}}>
        <Text style={{color: '#000000', fontSize: 32}}>Pick a color</Text>
        <TriangleColorPicker
          defaultColor={this.state.currentColor}
          onColorChange={this.onColorChange}
          style={{flex: 1}}
        />
        <View style={styles.container}>
          <TouchableHighlight>
            <View
              style={{backgroundColor: this.state.color1, height: 25, width: 90, marginTop: 10}}
            >
              <Button onPress={this.handleClick.bind(this, this.state.color1, 1)} title="" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View
              style={{backgroundColor: this.state.color2, height: 25, width: 90, marginTop: 10}}
            >
              <Button onPress={this.handleClick.bind(this, this.state.color2, 2)} title="" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View
              style={{backgroundColor: this.state.color3, height: 25, width: 90, marginTop: 10}}
            >
              <Button onPress={this.handleClick.bind(this, this.state.color3, 3)} title="" />
            </View>
          </TouchableHighlight>
        </View>
        <Button
          onPress={this.submitColor}
          title="Submit Colors"
          color="#000000"
          style={{fontSize: 32}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 20,
  },
});

function mapStateToProps({ colors }) {
  return { colors };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({addColors}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ThreeColorPicker);
