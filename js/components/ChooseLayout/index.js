import React from 'react';
import { StatusBar, StyleSheet, Text, Button, AsyncStorage, TouchableHighlight, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { addLayouts } from '../../actions/index';
import layoutsData from './layoutsData';
import LayoutItem from './LayoutItem';
import styles from '../../styles';
import Swiper from 'react-native-deck-swiper';

class ChooseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Stub layout data
      layoutsData: layoutsData,
      currentLayout: {'layouts':['PinterestContent']},
      chosenLayouts: {
      },
      selectedLayouts: 0,
    };
    this.handleLayoutPress = this.handleLayoutPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRightSwipe = this.handleRightSwipe.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleLayoutPress(layout, index) {
    this.setState({ currentLayout: layout });
  }

  calculatePreferredLayouts() {
    return Object.keys(this.state.chosenLayouts);
  }

  handleRightSwipe(index) {
    const currentLayout = this.state.layoutsData[index];
    const newChosenLayouts = Object.assign({}, this.state.chosenLayouts);
    currentLayout.layout && currentLayout.layouts.forEach(layoutType => {
      // Keep track of desired layout styles with shape chosenLayouts: {grid: 1, hero: 3}
      if (!!layoutType && newChosenLayouts[layoutType]) {
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
    navigate('PresetPalettes');
    // navigate('ThreeColorPicker');
    const layouts = this.calculatePreferredLayouts();
    this.props.addLayouts(layouts);
  }

  render() {
    return (
      <View style={ [styles.container] }>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={[styles.text, styles.title]}>What kind of websites do you like?</Text>
            <Text style={[styles.text, styles.subtitle]}>We'll use these for inspiration.</Text>
          </View>
        </View>
        <View style={ [styles.mainContainer, {alignSelf: 'baseline'}] } >
          <Swiper
            ref={(c) => this._deckSwiper = c}
            cards={this.state.layoutsData}
            onSwipedRight={(index) => this.handleRightSwipe(index)}
            verticalSwipe={false}
            renderCard={(layout) =>
              <LayoutItem
                key={layout.uri}
                layout={layout}
                handleLayoutPress={this.handleLayoutPress}
              />
            }
            >
          </Swiper>
        </View>
        <View style={styles.footerContainer}>
          <TouchableHighlight
            style={[styles.buttonCentered, styles.continueButton]}
            underlayColor='#1D59BF'
            onPress={this.handleSubmit}
          >
            <Text style={ styles.buttonText }>Continue</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ layouts }) {
  return { layouts };
}

export default connect(mapStateToProps, { addLayouts })(ChooseLayout);

