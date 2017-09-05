import React from 'react';
import { Text, TouchableHighlight, Image, View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleComp } from '../../actions/index';

class AddPageModalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComponent = this.toggleComponent.bind(this);
  }

  toggleComponent(name) {
    this.props.toggleComp(name);
  }

  render() {
    return (
      <View onPress={this.toggleComponent.bind(this, this.props.component.name)}>
        <Text style={styles.bigText}>Name: {this.props.component.name}</Text>
        <Image
          style={{width: 194, height: 120}}
          source={this.props.component.img}
        />
      </View>
    );
  }
}

function mapStateToProps({ toggledComps }) {
  return { toggledComps };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({toggleComp}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(AddPageModalEntry);

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