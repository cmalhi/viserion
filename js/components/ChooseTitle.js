import React from 'react';
import { AppRegistry, Button, Dimensions, StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';
import { postPreferences, createPreferences } from '../actions/index'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTitle } from '../actions/index';
import styles from '../styles';

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

    // Create preferences in redux state
    this.props.createPreferences();
    console.log('handle submit called');

    // Only navigate to ConfirmSite when all templates added
    this.props.postPreferences(() => navigate('ConfirmSite') );
    // navigate('ConfirmSite');  
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={[styles.text, styles.title]}>What's the name of your site?</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <TextInput
            placeholder="Choose a good one"
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.handleSubmit}
            clearButtonMode={'unless-editing'}
            keyboardType={"default"}
            style={ [
              styles.text,
              {
                height: 40,
                borderColor: '#3E84FB',
                borderBottomWidth: 1,
                fontSize: 30,
                width: Dimensions.get('window').width - 50,
              }
              ]}
          />
        </View>
        <View style={styles.footerContainer}>
          <TouchableHighlight
            style={ [styles.buttonCentered, styles.continueButton] }
            underlayColor='#1D59BF'
            onPress={this.handleSubmit}
          >
            <Text style={ [styles.buttonText, { color: '#eee', }] }>Generate</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({addTitle, postPreferences, createPreferences}, dispatch)
};

export default connect(null, matchDispatchToProps)(ChooseTitle);

