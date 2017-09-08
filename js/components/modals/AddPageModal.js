import React from 'react';
import { Animated, Button, Image, Text, TouchableOpacity, View, ScrollView, WebView, Dimensions, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appendPrefs } from '../../actions/index';
import componentMap from '../../componentMap';
const io = require('socket.io-client');

const tempURL = require('../../../images/components/text_image.png');

var {
  height: deviceHeight
} = Dimensions.get('window');

var id = 0;

class AddPageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      compList: [],
      sendCurrentAsync: {components: []},
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleEntryToggle = this.handleEntryToggle.bind(this);
    this.componentListMap = this.componentListMap.bind(this);
    this.mapEach = this.mapEach.bind(this);
    this.newId = this.newId.bind(this);
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

  newId(prefix='id') {
    id += 2;
    return prefix + id;
  }

  mapEach() {
    var result = [];
    for (var key in componentMap) {
      let mapped = this.componentListMap(componentMap[key].componentName);
      //push the image url in here too
      result.push({ attr: componentMap[key], displayName: mapped, img: tempURL });
    }
    this.setState({ compList: result });
  }

  componentListMap(name) {
    // add image urls in here
    const components = {
      Hero: {
        listName: 'Hero',
      },
      ImageContent: {
        listName: 'Image Content',
      },
      PinterestContent: {
        listName: 'Pinterest Content',
      },
      ImageCaption: {
        listName: 'Image Caption',
      },
      TextContent: {
        listName: 'Text Content',
      },
      Footer: {
        listName: 'Footer',
      },
    };
    if (components[name]) {
      return components[name].listName;
    }
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight,
    }).start(this.props.closeModal);
  }

  handleEntryToggle(attr) {
    console.log('you clicked on', attr);
    // Close modal
    this.closeModal();
    // Populate Webview with 'name' component
    const socket = io(global.HOST, { transports: ['websocket'] });
    // Emit to a socket with 'name'

    // set the components id to output newId
    attr.attr.id = this.newId();
    console.log(this.newId());
    this.props.appendPrefs(attr);

    this.setState({ sendCurrentAsync: { components: [...this.props.preferences] } }, () => {
      socket.emit('newPref', this.state.sendCurrentAsync);
    });
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
                  onPress={this.handleEntryToggle.bind(this, comp.attr)}
                  style={styles.bigText}>{comp.displayName}</Text>
                <TouchableOpacity
                  onPress={this.handleEntryToggle.bind(this, comp.attr)}
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

function mapStateToProps({ toggleOrder, preferences }) {
  return { toggleOrder, preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({appendPrefs}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(AddPageModal);

