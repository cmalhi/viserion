import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class ChooseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      template: '',
    }

    this.handleTemplateClick = this.handleTemplateClick.bind(this);
  }

  handleTemplateClick() {
    this.setState({template: ''});
    console.log('template clicked');
  }

  render() {
    console.log('rendered');
    return (
      <View style={styles.container}>
        <Text>Choose a Layout</Text>
        <View style={styles.row}>
          <View onPress={this.handleTemplateClick} style={{width: 120, height: 150, backgroundColor: 'skyblue'}} />
          <View style={{width: 120, height: 150, backgroundColor: 'powderblue'}} />
        </View>
        <View style={styles.row}>
          <View style={{width: 120, height: 150, backgroundColor: 'powderblue'}} />
          <View style={{width: 120, height: 150, backgroundColor: 'skyblue'}} />
        </View>
        <View style={styles.row}>
          <View style={{width: 120, height: 150, backgroundColor: 'skyblue'}} />
          <View style={{width: 120, height: 150, backgroundColor: 'powderblue'}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 400,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  template: {

  }
});
