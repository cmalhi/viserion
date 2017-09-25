import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, Button, StyleSheet, TextInput, TouchableHighlight, Platform, Easing } from 'react-native';
import SequencedList from '../RearrangeComponents/SequencedList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPrefs } from '../../actions/index';
const io = require('socket.io-client');
import { getObj, removeByValue } from '../../utils';
import styles from '../../styles';

var {
  width: deviceWidth
} = Dimensions.get('window');

/*
 * Notes:
 *  - OrderModal is special because unlike other components, it needs to keep
 *  track of the current sitePreferences of shape [{component1}, {component2}].
 */

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceWidth),
      // currentOrder: null,
      sequencedData: this.toSequencedData(this.props.preferences),
      sitePreferences: this.props.preferences,
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /*
   * toSequencedData: puts the preferences in a format that SortableListView can accept
   * @param {Array}
   * @output {Object}
   * {
   *  componentName1: { componentName: 'TextContent' },
   *  componentName2: { componentName: 'Footer' }
   * }
   */
  toSequencedData(components) {
    let sequencedData = {};
    components.map((c) => {
      sequencedData[c.id] = { id: c.id, componentName: c.componentName };
    });
    return sequencedData;
  }

  componentWillMount() {
    // TODO: make a GET request to sitePreferences
    let components = this.props.preferences;
    const sequencedData = this.toSequencedData(components);
    this.setState({ sequencedData });
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0,
    }).start();
  }

  /**
   * onChangeOrder - changes sitePreferences according to the order
   * @param {Array} orderData [ componentId, ..., componentId]
   *
   * sitePreferences = {
      components: [
        {
          componentName: 'Hero',
          attr: { title: 'Hello' },
        },
        {
          componentName: 'TextContent',
          attr: { title: 'title', body: 'goodbye' },
        },
        {
          componentName: 'Footer',
          attr: { title: 'Hello' },
        },
      ]
      }
   *
   */
  onChangeOrder(orderData) {
    const socket = io(global.HOST, { transports: ['websocket'] });
    var sitePref = [];

    orderData.forEach((id) => {
      var objArr = this.state.sitePreferences;
      var targetObj = getObj(objArr, 'id', id);
      sitePref.push(targetObj)
    });
    this.setState({ sitePreferences : sitePref });
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceWidth,
    }).start(this.props.closeModal);
  }

  handleUpdate() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    this.closeModal();
    socket.emit('updatePref', {room: this.props.siteId, newPref: this.state.sitePreferences});
  }

  handleDelete(id) {

    const socket = io(global.HOST, { transports: ['websocket'] });
    var componentToDelete = getObj(this.state.sitePreferences, 'id', id);
    var newSitePreferences = removeByValue(this.state.sitePreferences.slice(), componentToDelete);
    this.setState({
      sitePreferences: newSitePreferences,
      sequencedData: this.toSequencedData(newSitePreferences)
    });
    socket.emit('updatePref', {room: this.props.siteId, newPref: newSitePreferences});
  }

  render() {
    return(
      <Animated.View style={[styles.modal, {transform: [{translateX: this.state.offset}]}]}>
        <View style={styles2.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={[styles.center, styles.subtitle, styles.text]}>Close menu</Text>
          </TouchableOpacity>
          <Text style={[styles.title, {color: 'white'}]}>Rearrange Components</Text>
          <SequencedList data={this.state.sequencedData} onChangeOrder={this.onChangeOrder} handleDelete={this.handleDelete} />
          <View style={[{marginTop: '5%'}, styles.center]}>    
            <TouchableHighlight
              style={ [styles.buttonCentered, styles.continueButton] }
              underlayColor='#1D59BF'
              onPress={this.handleUpdate}
            >
              <Text style={ [styles.buttonText, { color: '#eee', }] }>Update</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Animated.View>
    )
  }
}
            //<Button onPress={this.handleUpdate} title="Update" />

export const styles2 = StyleSheet.create({
  form: {
    padding: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  flexContainer: {
    flex: 1,
  },
  webView: {
    padding: 10,
    width: '100%'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
  },
  innerModal:{
    width: '80%',
    backgroundColor: '#222A3C',
    padding: 10,
    position: 'relative',
    top: '5%',
    borderRadius: 10,
    height: '80%',
  },
  bigText:{
    fontSize: 20,
  },
  options:{
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

function mapStateToProps({ preferences, siteId }) {
  return { preferences, siteId };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setPrefs }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderModal);