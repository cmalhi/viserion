import React from 'react';
import { Text, TouchableHighlight, Image, View, StyleSheet } from 'react-native';

export default class AddPageModalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggledComps: [],
      allComponents: [],
    }
    this.toggleComponent = this.toggleComponent.bind(this);
  }
  //updating the allComponents variable should be accompinied 
  //with directly manipulating the preferences object 
  componentWillMount() {
    this.setState({toggledComps: this.props.toggledComps})
  }

  toggleComponent(name) {
    this.props.toggleComp(name);
  }

  render() {
    return (
      <View 
        
        onPress={this.toggleComponent.bind(this, this.props.component.name)}>
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