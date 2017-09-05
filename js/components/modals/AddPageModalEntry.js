import React from 'react';
import { Text, TouchableHighlight, Image, View, StyleSheet } from 'react-native';

export default class AddPageModalEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentPic = `../../../images/components/${this.props.component.img}`
    console.log('WE ARE IN THE ADD PAGE COMPONENT')
    return (
      <View>
        <Text style={styles.bigText}>Name: {this.props.component.name}</Text>
        <Image
          style={{width: 194, height: 120}}
          source={this.props.component.img}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  bigText: {
    fontSize: 20,
  },
});


//props needed

//the components name
//this.props.component.name
//an image of the component
//../../../images/components/{this.props.component.image}