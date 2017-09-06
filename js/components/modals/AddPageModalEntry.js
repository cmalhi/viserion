import React from 'react';
import { Text, TouchableHighlight, Image, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appendOrder } from '../../actions/index';

class AddPageModalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleEntryToggle = this.handleEntryToggle.bind(this);
  }

  //updating the allComponents variable should be accompinied 
  //with directly manipulating the preferences object 

  componentWillMount() {
  }

  handleEntryToggle() {
    console.log('you clicked on' );
    //this.props.appendOrder(name)
  }

  render() {
    return (
      <View>
        <Text 
          onPress={this.handleEntryToggle}
          style={styles.bigText}>{this.props.component.name}</Text>
        <Image
          style={{width: 194, height: 120}}
          source={this.props.component.img}
          onPress={this.handleEntryToggle}
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

function mapStateToProps({ appendOrder }) {
  return { appendOrder };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({appendOrder}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(AddPageModalEntry);

//props needed

//the components name
//this.props.component.name
//an image of the component
//../../../images/components/{this.props.component.image}