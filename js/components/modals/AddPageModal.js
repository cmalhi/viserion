import React from 'react';
import { Animated, Button, Image, Text, TouchableOpacity, View, ScrollView, WebView, Dimensions, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appendPrefs } from '../../actions/index';
import componentMap from '../../componentMap';
const io = require('socket.io-client');
// import { store } from '../App.js'

const tempURL = require('../../../images/components/text_image.png');

var {
  height: deviceHeight
} = Dimensions.get('window');

class AddPageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      compList: [],
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.mapEach = this.mapEach.bind(this);
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

  mapEach() {
    var result = [];
    for (var key in componentMap) {
      let mapped = key.split(/(?=[A-Z])/).join(" ");
      //push the image url in here too
      result.push({ attr: componentMap[key], displayName: mapped, img: tempURL });
    }
    this.setState({ compList: result });
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight,
    }).start(this.props.closeModal);
  }

  handleAdd(newComponent) {
    this.closeModal();
    const socket = io(global.HOST, { transports: ['websocket'] });
    socket.emit('addPref', newComponent );
  }

  render() {
    return (
      <Animated.View
        style={[styles.modal, { transform: [{ translateY: this.state.offset }] }]}
      >
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.center}>Close Menu</Text>
          </TouchableOpacity>
          <ScrollView>
            {this.state.compList.map((comp, index) =>
              <View key={index}>
                <Text
                  onPress={this.handleAdd.bind(this, comp.attr)}
                  style={styles.bigText}>{comp.displayName}</Text>
                <TouchableOpacity
                  onPress={this.handleAdd.bind(this, comp.attr)}
                >
                  <Image
                    style={{ width: 194, height: 120 }}
                    source={comp.img}
                  />
                </TouchableOpacity>
              </View>)
            }
          </ScrollView>
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
    selected: {
    opacity: 0.5,
    backgroundColor: '#FFF',
  },
});

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({appendPrefs}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(AddPageModal);
