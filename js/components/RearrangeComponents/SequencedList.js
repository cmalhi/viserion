import React, { Component } from 'react';
import { Button } from 'react-native'
import {
  Animated,
  Easing,
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const window = Dimensions.get('window');

export default class SequencedList extends Component {

  render() {
    const {data, active} = this.props;
    return (
      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={this.props.data}
        renderRow={this._renderRow}
        onChangeOrder={this.props.onChangeOrder}
      />
    );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} handleDelete={this.props.handleDelete} />
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
    const { data, active } = this.props;
    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        {/*<Image source={{uri: data.image}} style={styles.image} />*/}
        <View style={{flex: 0.3}}>
          <MaterialCommunityIcons name="drag-vertical" size={25} color="white" />
          {/*<Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>...</Text>*/}
        </View>
        <View style={{flex: 1}}>
          <Text style={[styles.text, styles.inverse, {color: 'white'}]}>{data.componentName}</Text>
        </View>
        <View style={{flex: .35}} pointerEvents="box-none">
          
          {/*<Button
            onPress={(e) => {
              e.stopPropagation();
              e.preventDefault();
              this.props.handleDelete(data.id)
            }}
            title="Delete" />*/}

          <TouchableHighlight
            style={[styles.sideButton, styles.buttonCentered]}
            underlayColor='#3D6DF9'
            onPress={(e) => {
              e.stopPropagation();
              e.preventDefault();
              this.props.handleDelete(data.id)
            }}
          >
            <MaterialIcons name="close" color="#fff" size={25} />
          </TouchableHighlight>
          {/*<TouchableOpacity*/}
            {/*style={{flex : 1.1, height: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue'}}*/}
            {/*onPress={(e) => {*/}
              {/*e.stopPropagation();*/}
              {/*e.preventDefault();*/}
              {/*this.props.handleDelete(data.id)*/}
            {/*}}>*/}
            {/*<Text style={{ color: '#3E84FB', fontSize: 20 }}>Delete</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>

      </Animated.View>
    );
  }
}

// TODO: move to styles.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    // width: window.width,
    width: '90%',

    ...Platform.select({
      ios: {
        // paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#060E22',
    padding: 16,
    height: 60,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 19,
    color: '#222222',
  },
});
