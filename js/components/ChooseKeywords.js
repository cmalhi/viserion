import React from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { addKeywords } from '../actions/index';
import styles from '../styles';

class ChooseKeywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: ['portfolio', 'business', 'cooking', 'photography', 'student', 'food', 'corporate', 'milk', 'blog', 'material'],
      selectedKeywords: {}
    };
    this.handleKeywordPress = this.handleKeywordPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderKeywordChoices = this.renderKeywordChoices.bind(this);
  }

  handleKeywordPress(keyword) {
    const selected = this.state.selectedKeywords[keyword] ? false : true;
    const newSelectedKeywords = Object.assign({}, this.state.selectedKeywords, {[keyword]: selected});
    this.setState({ selectedKeywords: newSelectedKeywords });
  }

  handleSubmit() {
    const { navigate } = this.props.navigation;
    navigate('Title');

    const keywords = _.reduce(this.state.selectedKeywords, (result, selectedStatus, keyword) => {
      if (selectedStatus === true ) result.push(keyword);
      return result;
    }, []);

    this.props.addKeywords(keywords);
  }

  renderKeywordChoices() {
    return this.state.keywords.map((keyword, index) => {
      return ( 
        <TouchableHighlight key={index} style={[styles.keyword, this.state.selectedKeywords[keyword] && styles.keywordSelected]} onPress={this.handleKeywordPress.bind(this, keyword)} >
          <Text style={[styles.text, styles.keywordText, { fontFamily: 'Avenir-Heavy' }]} >{keyword}</Text>
        </TouchableHighlight > 
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={[styles.text, styles.title]}>Anything else?</Text>
            <Text style={[styles.text, styles.subtitle]}>We'll use these for inspiration.</Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.keywordsContainer}>
            { this.renderKeywordChoices() }
          </View>
        </View>
        <View style={styles.footerContainer}>
          <TouchableHighlight
            style={ [styles.buttonCentered, styles.continueButton] }
            underlayColor='#1D59BF'
            onPress={this.handleSubmit}
          >
            <Text style={ [styles.buttonText, { color: '#eee', }] }>Continue</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default connect(null, { addKeywords })(ChooseKeywords);
