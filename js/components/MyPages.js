import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default class MyPages extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.items}>
            <View style={styles.item}>
              <Text>1</Text>
            </View>
            <View style={styles.item}>
              <Text>2</Text>
            </View>
            <View style={styles.item}>
              <Text>3</Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <TouchableHighlight
            style={styles.addButton}
            underlayColor='#ff7043'
            onPress={()=>{ navigate('Template') }}
          >
            <Entypo name="plus" size={25} color="white" />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    // flex: 1,
    padding: 10,
  },
  text:{
  },
  items: {
    flexDirection: 'column',
  },
  item: {
    height: 200,
    width: '100%',
    backgroundColor: '#eee',
    margin: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: "#000000",
    paddingLeft: 1,
    paddingTop: 2,
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 0
    // }
  }
});