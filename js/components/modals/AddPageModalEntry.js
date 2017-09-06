import React from 'react';
import { Text, TouchableHighlight, Image, View, StyleSheet } from 'react-native';

export default class AddPageModalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
    }
  }
  //updating the allComponents variable should be accompinied 
  //with directly manipulating the preferences object 
  componentWillMount() {
    this.setState({add: this.props.component.add})
  }

  render() {
    return (
      <View>
        <Text style={styles.bigText}>{this.props.component.name}</Text>
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
    selected: {
    opacity: 0.5,
    backgroundColor: '#000'
  },
});


//props needed

//the components name
//this.props.component.name
//an image of the component
//../../../images/components/{this.props.component.image}