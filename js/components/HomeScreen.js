import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
const io = require('socket.io-client');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appendPrefs, updatePrefs } from '../actions/index';

import ConfirmSite from './ConfirmSite';
import Login from './Login';
import SignUp from './SignUp';
import UserEdit from './UserEdit';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      data: null,
    }
  }

  componentDidMount() {
    // All sockets go here
    const socket = io(global.HOST, { transports: ['websocket'] });
    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('addPrefDomStore', (addition) => {
      this.props.appendPrefs(addition)
    });

    socket.on('updatePrefDomStore', (newPrefs) => {
      this.props.updatePrefs(newPrefs)
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/*<View style={styles.navBar}>*/}
          {/*<Text style={styles.navBarButton}>Back</Text>*/}
          {/*<Text style={styles.navBarHeader}>WebExpress</Text>*/}
          {/*<Text style={styles.navBarButton}>More</Text>*/}
        {/*</View>*/}
        <View style={styles.content}>
          <Text>socket connected: {this.state.isConnected ? 'true' : 'false'}</Text>
          <Text onPress={() => { navigate('MainApp')}} style={styles.text}>MainApp</Text>
          <Text onPress={() => { navigate('SignUp')}} style={styles.text}>Step 0: Sign Up</Text>
          <Text onPress={() => { navigate('Login')}} style={styles.text}>Step 0.5: Log In</Text>
          <Text onPress={() => { navigate('Template')}} style={styles.text}>Step 1: Template</Text>
          <Text onPress={() => { navigate('PresetPalettes')}} style={styles.text}>Step 2: Color</Text>
          <Text onPress={() => { navigate('Keywords')}} style={styles.text}>Step 3: Keywords</Text>
          <Text onPress={() => { navigate('Title')}} style={styles.text}>Step 4: Title</Text>
          <Text onPress={() => { navigate('ConfirmSite')}} style={styles.text}>Step 5: Confirm Selection</Text>
          <Text onPress={() => { navigate('ShareScreen')}} style={styles.text}>Step 6: Share Link </Text>
          <Text onPress={() => { navigate('Page')}} style={styles.text}>Final Page</Text>
          <Text onPress={() => { navigate('UserEdit')}} style={styles.text, styles.inDev}>In dev: User Editing</Text>
          <Text onPress={() => { navigate('Saved')}} style={styles.text, styles.inDev}>In dev: Saved Pages</Text>
        </View>
        {/*<View style={styles.tabBar}>*/}
          {/*<View style={[styles.tabBarButton, styles.button1]}>*/}
            {/*<Text style={styles.text}>Gallery</Text>*/}
          {/*</View>*/}
          {/*<View style={[styles.tabBarButton, styles.button2]}>*/}
            {/*<Text style={styles.text}>My Sites</Text>*/}
          {/*</View>*/}
        {/*</View>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    height: 34,
    paddingTop: 10,
    backgroundColor: '#bbb'
  },
  navBarButton: {
  },
  navBarHeader: {
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
    // color: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  text: {
    // color: '#eee',
    fontSize: 20,
  },
  tabBar: {
    height: 40,
    flexDirection: 'row',
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#eee'
  },
  button2: {
    backgroundColor: '#ddd'
  },
  inDev: {
    backgroundColor: 'yellow'
  }
});

// const styles = StyleSheet.create({
//   content:{
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#374046'
//   },
//   container: {
//     justifyContent: 'flex-start',
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: '#444',
//   },
//   defaultText: {
//     fontSize: 25,
//   },
//   inDevelopment: {
//     fontSize: 25,
//     backgroundColor: 'yellow',
//   }
// });

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ appendPrefs, updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);
