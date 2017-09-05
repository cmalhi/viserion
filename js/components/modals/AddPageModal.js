import React from 'react';
import { Animated, Button, Image, Text, TouchableOpacity, View, WebView, Dimensions, StyleSheet } from 'react-native';
import AddPageModalEntry from './AddPageModalEntry'
var {
  height: deviceHeight
} = Dimensions.get('window');

class AddPageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      offset: new Animated.Value(deviceHeight),
      components: [
        {
          name: 'the title',
          img: require('../../../images/components/pricing.png'),
        },
        {
          name: 'pinterest',
          img: require('../../../images/components/text_image.png'),
        },
      ],
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  }

  render() {
    return (
      <Animated.View
        style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.center}>Close Menu</Text>
          </TouchableOpacity>
          <View>
            {this.state.components.map((comp, index) =>  <AddPageModalEntry component={comp} key={index} /> )}
          </View>
          <Button title="Add Components"></Button>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  webView: {
    padding: 10,
    width: '100%',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
  },
  innerModal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    position: 'relative',
    top: '5%',
    borderRadius: 10,
  },
  bigText: {
    fontSize: 20,
  },
});

export default AddPageModal;

// click add/rearrange. done
// click add (+) or swipe from right to left. in progress
  // if add page modal = true then make the order modal false, translate to the left and bring in add component modal from right 
// modal pops in from the right
// click on the one you want to add
// goes back to left modal
// new component is appended to the bottom of the list (above the footer) drag it to the spot that you want
// it should automatically scroll to that spot (might need to change the sortable list view)
// highlight the newly added list entry in the order modal 
// click 
