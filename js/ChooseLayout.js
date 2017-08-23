import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

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
    return (
      <View style={styles.container}>        
        <Text>Choose a Layout!</Text>
        <TouchableHighlight onPress={this.handleTemplateClick}>
          <Image
            style={styles.template}
            source={{uri: 'http://www.jhigh.co.uk/ITIntroCourses/S2Courses/DreamweaverWebsite/images/layoutIdeas/layoutideas-6-FixedSidebar.jpg'}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.handleTemplateClick}>
          <Image
            style={styles.template}
            source={{uri: 'http://www.jhigh.co.uk/ITIntroCourses/S2Courses/DreamweaverWebsite/images/layoutIdeas/layoutideas-6-FixedSidebar.jpg'}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.handleTemplateClick}>
          <Image
            style={styles.template}
            source={{uri: 'http://www.jhigh.co.uk/ITIntroCourses/S2Courses/DreamweaverWebsite/images/layoutIdeas/layoutideas-6-FixedSidebar.jpg'}}
          />
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 350,
  },
  template: {
    width: 200,
    height: 100,
  }
});

