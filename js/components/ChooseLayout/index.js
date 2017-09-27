import React from 'react';
import { StatusBar, StyleSheet, Text, Button, AsyncStorage, TouchableHighlight } from 'react-native';
import { DeckSwiper, View } from 'native-base';
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
  
  handleLayoutPress(layout, index) {
    console.log('layout pressed', layout.uri);
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

//   render () {
//     return (
//       <View style={styles.container}>
//           <Swiper
//               cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
//               renderCard={(card) => {
//                   return (
//                       <View 
//                       style={styles.card}
//                       key={2}
//                       >
//                           <Text style={styles.text}>{card}</Text>
//                       </View>
//                   )
//               }}
//               onSwiped={(cardIndex) => {console.log(cardIndex)}}
//               onSwipedAll={() => {console.log('onSwipedAll')}}
//               cardIndex={0}
//               backgroundColor={'#4FD0E9'}>
//           </Swiper>
//       </View>
//     );
// }

  // render() {
  //   return (
  //     <View style={ [styles.container] }>
  //       <View style={styles.headerContainer}>
  //         <View style={styles.header}>
  //           <Text style={[styles.text, styles.title]}>What kind of websites do you like?</Text>
  //           <Text style={[styles.text, styles.subtitle]}>We'll use these for inspiration.</Text>
  //         </View>
  //       </View>
  //       <View style={ [styles.mainContainer, {marginLeft: -100}] } >
  //         <Swiper
  //           ref={(c) => this._deckSwiper = c}
  //           cards={this.state.layoutsData}
  //           renderCard={(layout) =>
  //             <LayoutItem
  //               key={layout.uri}
  //               layout={layout}
  //               handleLayoutPress={this.handleLayoutPress}
  //             />
  //           }
  //           >
  //         </Swiper>
  //       </View>
  //       <View style={styles.footerContainer}>
  //         <TouchableHighlight
  //           style={[styles.buttonCentered, styles.continueButton]}
  //           underlayColor='#1D59BF'
  //           onPress={this.handleSubmit}
  //         >
  //           <Text style={ styles.buttonText }>Continue</Text>
  //         </TouchableHighlight>
  //       </View>
  //     </View>
  //   );
  // }

  render() {
    return (
      <View style={ [styles.container] }>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={[styles.text, styles.title]}>What kind of websites do you like?</Text>
            <Text style={[styles.text, styles.subtitle]}>We'll use these for inspiration.</Text>
          </View>
        </View>
        <View style={ [styles.mainContainer, {marginTop: 20}] } >
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={this.state.layoutsData}
            looping={false}
            onSwipeRight={this.handleRightSwipe}
            onSwipeLeft={this.handleRightSwipe}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text style={[styles.title, styles.text]}>That's all!</Text>
              </View>}
            renderItem={(layout) => {
              console.log('Next site >>', layout.uri);
              return(<View>
                <LayoutItem
                  layout={layout}
                  handleLayoutPress={this.handleLayoutPress}
                />
              </View>)
            }
            }
          />
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

