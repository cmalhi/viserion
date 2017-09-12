import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
const io = require('socket.io-client');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
import { updateComponent } from '../../utils.js';

var {
  height: deviceHeight
} = Dimensions.get('window');

class ListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      details: this.props.details,
      Id: this.props.Id,
      newItem: '',
      data: this.props.data,
      list: this.props.data.list,
    };
    this.closeModal = this.closeModal.bind(this);
    this.closeAndUpdate = this.closeAndUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  }

  closeAndUpdate() {
    const socket = io(global.HOST, { transports: ['websocket'] });
    this.closeModal();
    var value = this.state.list;
    var { id, path } = this.props.data;
    var newPref = updateComponent(this.props.preferences, id, path, value);
    socket.emit('updatePref', newPref);
  };

  handleDelete(index) {
    var newList = [...this.state.list];
    newList.splice(index, 1);
    this.setState({ list: newList });
  }

  addToList() {
    this.setState({ list: [...this.state.list, this.state.newItem] });
    this.setState({ newItem: '' });
  }

  render() {
    return (
      <Animated.View style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeAndUpdate}>
            <Text style={styles.center}>Close Menu</Text>
          </TouchableOpacity>
          <Text style={styles.bigText}>Add/Modify List Item</Text>
          <View style={styles.container}>
            {this.state.list.map((c, index) => {
              return(
                <View key={index}>
                  <Text>{c}</Text>
                  <Text onPress={this.handleDelete.bind(this, index)}>Delete</Text>
                </View>
              );
            })}
          </View>
          <TextInput style={styles.form} onChangeText={(newItem) => { 
            this.setState({newItem})
            } 
            }value={this.state.newItem} />
          <Button onPress={this.addToList} title="Enter" />
        </View>
      </Animated.View>
    )
  }
}

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ListModal);

export const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
    padding: 10,
    position: 'relative',
    top: '5%',
    borderRadius: 10
  },
  bigText:{
    fontSize: 20,
  },
});