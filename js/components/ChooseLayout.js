import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { toggleLayout } from '../actions/index'

class ChooseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      template: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>        
        <Text>Choose a Layout!</Text>
        <TouchableHighlight style={this.props.layouts[1] && styles.selected} onPress={this.props.toggleLayout.bind(this, '1')}>
          <Image
            style={styles.template}
            source={require('../../images/portfolio-template.jpg')}/>
        </TouchableHighlight >
        <TouchableHighlight style={this.props.layouts[2] && styles.selected} onPress={this.props.toggleLayout.bind(this, '2')}>
          <Image
            style={styles.template}
            source={require('../../images/spotify-template.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight style={this.props.layouts[3] && styles.selected} onPress={this.props.toggleLayout.bind(this, '3')}>
          <Image
            style={styles.template}
            source={require('../../images/contact-template.png')}
          />
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#BEBDC0',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 350,
  },
  selected: {
    opacity: 0.5,
    backgroundColor: '#000'
  },
  template: {
    width: 200,
    height: 100,
  },
});

function mapStateToProps({ layouts }) {
  return { layouts };
}

export default connect(mapStateToProps, { toggleLayout })(ChooseLayout);


