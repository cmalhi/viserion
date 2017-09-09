import React from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { addKeywords } from '../actions/index';

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
        <TouchableHighlight key={index} style={[styles.keyword, this.state.selectedKeywords[keyword] && styles.selected]} onPress={this.handleKeywordPress.bind(this, keyword)} >
          <Text style={styles.keywordText} >{keyword}</Text>
        </TouchableHighlight > 
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose Some Keywords!</Text>
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 20,
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
  selected: {
    opacity: 0.7,
    backgroundColor: '#15433A',
  },
  keywordText: {
    fontSize: 20,
    color: '#fff',
  }
});


export default connect(null, { addKeywords })(ChooseKeywords);
