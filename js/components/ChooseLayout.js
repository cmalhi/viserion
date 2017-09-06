import React from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { toggleLayout } from '../actions/index';
import layoutsData from '../layoutsData';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon } from 'native-base';

class ChooseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Stub layout data
      layoutsHidden: layoutsData,
      layoutsShown: [
        { name: 'grid',
          uri: require('../../images/templates/portfolio-template.jpg'),
          layouts: ['grid'],
        },
        { name: 'basic',
          uri: require('../../images/templates/spotify-template.png'),
          layouts: ['hero'],
        },
        { name: 'contact',
          uri: require('../../images/templates/contact-template.png'),
          layouts: ['contact'],
        },
      ],
      chosenLayouts: {
        selectedLayouts: 0,
      },
    };
    this.handleLayoutPress = this.handleLayoutPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderLayoutChoices = this.renderLayoutChoices.bind(this);
  }



  handleLayoutPress(layout, index) {
    // Stores chosen layouts in redux state and toggle styles 
    // this.props.toggleLayout(layout);
    let newLayouts = this.state.layoutsShown;
    let oldLayouts = this.state.layoutsHidden;
    if (oldLayouts.length) {
      newLayouts[index] = oldLayouts.pop();
    } else {
      newLayouts[index] = null;
    }
    this.setState({ layoutsShown: newLayouts });
    this.setState({ layoutsHidden: oldLayouts });
  }

  handleSubmit() {
    const { navigate } = this.props.navigation;
    navigate('Color');
  }

  renderLayoutChoices() {
    return this.state.layoutsShown.map((layout, index, layoutsShown) => {
      if (index === 0 && layoutsShown[1] === null && layoutsShown[2] === null ) {
        return (
          <Text key={index}>That's all!</Text>
        )
      }
      if (layout === null) return null;
      return (
        <TouchableHighlight
          key={index}
          // style={this.props.layouts[layout.name] && styles.selected}
          onPress={this.handleLayoutPress.bind(this, layout.name, index)}
        >
          <Image
            style={styles.template}
            source={layout.uri}/>
        </TouchableHighlight >
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>     
        <Text>Choose some look and feels that you like</Text>
        { this.renderLayoutChoices() }
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
    backgroundColor: '#BEBDC0',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 350,
  },
  selected: {
    opacity: 0.5,
    backgroundColor: '#000',
  },
  template: {
    width: 200,
    height: 100,
  },
});

function mapStateToProps({ layouts }) {
  return { layouts };
}

export default connect(mapStateToProps, { toggleLayout })(ChooseLayout);

