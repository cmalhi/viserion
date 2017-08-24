import React from 'react';
import { Alert, AppRegistry, Button, ListView, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleColor } from '../actions/index'

class ChooseColor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Choose a color ;)</Text>

        <View style={styles.linebreak} />

        <TouchableHighlight onPress={this.props.toggleColor.bind(this, 'blue')} >
          <View style={{width: 100, height: 100, backgroundColor: '#0070FF'}} />
        </TouchableHighlight>

        <TouchableHighlight onPress={this.props.toggleColor.bind(this, 'red')} >
          <View style={{width: 100, height: 100, backgroundColor: '#F02311'}} />
        </TouchableHighlight>

        <TouchableHighlight onPress={this.props.toggleColor.bind(this, 'green')} >
          <View style={{width: 100, height: 100, backgroundColor: '#00FF00'}} />
        </TouchableHighlight>
        
        <Button
          onPress={() => { navigate('Title')}}
          title="Submit"
          color="#000000"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  linebreak: {
    width: '100%',
  }
});

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({toggleColor}, dispatch)
}

export default connect(null, matchDispatchToProps)(ChooseColor);
