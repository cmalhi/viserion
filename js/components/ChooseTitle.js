import React from 'react';
import { AppRegistry, Button, StyleSheet, Text, TextInput, View } from 'react-native';
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
        <View style={[styles.header, styles.headerHeight]}>
          <Text style={styles.title}>What's the name of your site?</Text>
        </View>
        <View style={styles.mainHeight}>
          <TextInput
            placeholder="Choose a good one"
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.handleSubmit}
            clearButtonMode={'unless-editing'}
            keyboardType={"default"}
          />
        </View>
        <View style={styles.footerHeight}>
          <Button
            onPress={this.handleSubmit}
            title="Generate your custom pages"
          />
        </View>
      </View>
    );
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({addTitle, postPreferences, createPreferences}, dispatch)
};

export default connect(null, matchDispatchToProps)(ChooseTitle);

