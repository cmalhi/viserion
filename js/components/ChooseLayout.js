import React from 'react';
import { StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, View, Left, Body, Icon } from 'native-base';
import { connect } from 'react-redux';
import { toggleLayout } from '../actions/index';
import layoutsData from '../layoutsData';
import LayoutItem from './LayoutItem';

class ChooseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Stub layout data
      layoutsData: layoutsData,
      chosenLayouts: {
        selectedLayouts: 0,
      },
    };
    this.handleLayoutPress = this.handleLayoutPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLayoutPress(layout, index) {
    // Stores chosen layouts in redux state and toggle styles 
    // this.props.toggleLayout(layout);
    let newLayouts = this.state.layoutsShown;
    let oldLayouts = this.state.layoutsData;
    if (oldLayouts.length) {
      newLayouts[index] = oldLayouts.pop();
    } else {
      newLayouts[index] = null;
    }
    this.setState({ layoutsShown: newLayouts });
    this.setState({ layoutsData: oldLayouts });
  }

  handleSubmit() {
    const { navigate } = this.props.navigation;
    navigate('Color');
  }

  render() {
    // return (
    //   <View style={styles.container}>     
    //     <Text>Choose some look and feels that you like</Text>
    //     { this.renderLayoutChoices() }
    //     <Button
    //       onPress={this.handleSubmit}
    //       title="Submit"
    //       color="#000000"
    //     />
    //   </View>
    // );

    return (
      <View style={styles.container}>
        <Text>Choose some look and feels that you like</Text>
        <DeckSwiper
          ref={(c) => this._deckSwiper = c}
          dataSource={this.state.layoutsData}
          looping={false}
          renderEmpty={() =>
            <View style={{ alignSelf: "center" }}>
              <Text>That's all!</Text>
            </View>}
          renderItem={(layout, index) =>
            <LayoutItem layout={layout} index={index} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    // paddingLeft: 30,
    // backgroundColor: '#BEBDC0',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // height: 200,
    alignItems: 'center',
  },
});

function mapStateToProps({ layouts }) {
  return { layouts };
}

export default connect(mapStateToProps, { toggleLayout })(ChooseLayout);

