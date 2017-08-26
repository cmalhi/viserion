import React from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { toggleLayout } from '../actions/index';

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

  renderKeywordChoices() {
    return this.state.keywords.map(keyword => {
      return ( 
        <TouchableHighlight style={this.state.selectedKeywords[keyword.name] && styles.selected, styles.keyword} onPress={(keyword) => this.handleKeywordPress(keyword)}>
          <Text style={styles.keywordText} >{keyword}</Text>
        </TouchableHighlight > 
      );
    });
  }

  handleKeywordPress(keyword) {
    const selected = this.state.selectedKeywords[keyword] ? false : true;
    this.setState(...this.state.selectedKeywords, {keyword: selected});
    console.log(keyword, 'has been pressed');
  }

  handleSubmit() {
    const { navigate } = this.props.navigation;
    navigate('ConfirmSite');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Choose Some Keywords!</Text>
        <View style={styles.keywordsContainer}>        
          { this.renderKeywordChoices() }
        </View>
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
    paddingTop: 30,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  selected: {
    opacity: 0.5,
    backgroundColor: '#000'
  },
  keyword: {
    backgroundColor: '#2E9D88',
    borderRadius: 5,
    padding: 2,
    height: 30,
    margin: 5,
    paddingHorizontal: 3,
  },
  keywordsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  keywordText: {
    fontSize: 20,
    color: '#fff',
  }
});


export default connect(null, {  })(ChooseKeywords);
