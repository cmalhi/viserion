import React from 'react';
import { AppRegistry, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { postPreferences } from '../actions/index'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTitle } from '../actions/index';

class ChooseTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { navigate } = this.props.navigation; 
    this.props.addTitle(this.state.text);
    this.props.postPreferences();
    console.log('You submitted: ', this.state.text);
    navigate('ConfirmSite');  
  }

  render() {
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
          onPress={this.handleSubmit}
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

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({addSite, postPreferences}, dispatch)
}

export default connect(null, matchDispatchToProps)(ChooseTitle);

