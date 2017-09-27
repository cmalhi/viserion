import React from 'react';
import { Animated, Button, Image, Text, TouchableOpacity, View, ScrollView, WebView, Dimensions, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appendPrefs } from '../../actions/index';
import componentMap from '../../componentMap';
import styles from '../../styles';
const io = require('socket.io-client');

var {
  width: deviceWidth
} = Dimensions.get('window');

var id = 0;

class AddComponentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceWidth),
      compList: [],
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.mapEach = this.mapEach.bind(this);
    this.newId = this.newId.bind(this);

    this.images = {
      ImageContent: require('../../../images/components/ImageContent.png'),
      TextContent: require('../../../images/components/TextContent.png'),
      PinterestText: require('../../../images/components/PinterestText.png'),
      PinterestContent: require('../../../images/components/PinterestContent.png'),
      Hero: require('../../../images/components/Hero.png'),
      GradientHero: require('../../../images/components/GradientHero.png'),
      Footer: require('../../../images/components/Footer.png'),
      ImageCaption: require('../../../images/components/ImageCaption.png'),
    }
  }

  componentWillMount() {
    this.mapEach();
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0,
    }).start();
  }

  newId(prefix = 'id') {
    id += 2;
    return prefix + id;
  }

  mapEach() {
    var result = [];
    for (var key in componentMap) {
      // Turns "GradientHero" into "Gradient Hero"
      // let mapped = key.split(/(?=[A-Z])/).join(" ");
      let mapped = componentMap[key]['displayName'];
      result.push({ attr: componentMap[key], displayName: mapped, img: false });
    }
    this.setState({ compList: result });
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceWidth,
    }).start(this.props.closeModal);
  }

  handleAdd(newComponent) {
    this.closeModal();
    const socket = io(global.HOST, { transports: ['websocket'] });
    newComponent.id = this.newId();
    socket.emit('addPref', { room: this.props.siteId, newComponent: newComponent } );
  }

  render() {
    return (
      <Animated.View
        style={[styles.modal, { transform: [{ translateX: this.state.offset }] }]}
      >
        <View style={[styles.innerModal, {padding: 20, height: 500}]}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={[styles.center, styles.subtitle, styles.text]}>Close Menu</Text>
          </TouchableOpacity>
          <Text style={[styles.title, {fontSize: 25, color: 'white'}]}>Add a Component</Text>
          <ScrollView>
            {this.state.compList.map((comp, index) =>
              <View key={index}>
                <Text
                  onPress={this.handleAdd.bind(this, comp.attr)}
                  style={[styles.subtitle, styles.text, {fontSize: 25}]}>{comp.displayName}</Text>
                <TouchableOpacity
                  onPress={this.handleAdd.bind(this, comp.attr)}
                >
                  {comp.img ? <Image
                    style={{ width: 194, height: 120 }}
                    source={comp.img}
                  /> : null}
                </TouchableOpacity>
              </View>)
            }
          </ScrollView>
        </View>
      </Animated.View>
    )
  }
}

function mapStateToProps({ preferences, siteId }) {
  return { preferences, siteId };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({appendPrefs}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(AddComponentModal);
