import React from 'react';
import { AppRegistry, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class ChooseTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    //Save title preference to DB
    console.log('You submitted: ', this.state.text);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Enter a title</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Choose a good one"
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this.handleSubmit}
          clearButtonMode={'unless-editing'}
          keyboardType={"default"}
        />
        <Button
          onPress={() => { navigate('Page')}}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});