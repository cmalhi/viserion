import React from 'react';
import { StyleSheet, Text, Image, TouchableHighlight, Button } from 'react-native';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, View, Left, Body, Icon } from 'native-base';
import { connect } from 'react-redux';
import { addLayouts } from '../../actions/index';
import layoutsData from '../../layoutsData';
import LayoutItem from './LayoutItem';

class ChooseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Stub layout data
      layoutsData: layoutsData,
      currentLayout: '',
      chosenLayouts: {
      },
      selectedLayouts: 0,
    };
    this.handleLayoutPress = this.handleLayoutPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRightSwipe = this.handleRightSwipe.bind(this);
  }

  handleLayoutPress(layout, index) {
    console.log('layout pressed', layout);
    this.setState({ currentLayout: layout });
  }

  calculatePreferredLayouts() {
    return Object.keys(this.state.chosenLayouts);
  }

  handleRightSwipe() {
    const { currentLayout } = this.state;
    const newChosenLayouts = Object.assign({}, this.state.chosenLayouts);
    currentLayout.layouts.forEach(layoutType => {
      // Keep track of desired layout styles with shape chosenLayouts: {grid: 1, hero: 3}
      if (newChosenLayouts[layoutType]) {
        newChosenLayouts[layoutType]++;
      } else {
        newChosenLayouts[layoutType] = 1;
      }
    });
    this.setState({ 
      selectedLayouts: this.state.selectedLayouts + 1,
      chosenLayouts: newChosenLayouts 
    });
  }

  handleSubmit() {
    const { navigate } = this.props.navigation;
    navigate('Color');

    const layouts = this.calculatePreferredLayouts();
    console.log('these are layouts >>>>>', layouts);
    this.props.addLayouts(layouts);

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose some looks and feels that you like</Text>
        <View style={styles.deckContainer}>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={this.state.layoutsData}
            looping={false}
            onSwipeRight={this.handleRightSwipe}
            onSwipeLeft={this.handleRightSwipe}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text style={styles.title}>That\'s all!</Text>
              </View>}
            renderItem={(layout) =>
              <LayoutItem 
                layout={layout} 
                handleLayoutPress={this.handleLayoutPress}
              />
            }
          />
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
    // marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deckContainer: {
    marginTop: -390,
  },
  title: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
  },
});

function mapStateToProps({ layouts }) {
  return { layouts };
}

export default connect(mapStateToProps, { addLayouts })(ChooseLayout);

