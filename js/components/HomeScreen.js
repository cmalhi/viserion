import React from 'react';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ConfirmSite from './ConfirmSite';
import Login from './Login';
import SignUp from './SignUp';
import UserEdit from './UserEdit';
const io = require('socket.io-client');
import { Font } from 'expo';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      data: null,
      fontLoaded: false,
    }
  }

  componentDidMount() {
    // Fonts
    this.setState({ fontLoaded: true });
    const socket = io(global.HOST, { transports: ['websocket'] });
    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>socket connected: {this.state.isConnected ? 'true' : 'false'}</Text>
          <Text onPress={() => { navigate('MainApp')}} style={styles.text}>App Main Screen</Text>
          <Text></Text>
          <Text onPress={() => { navigate('Prescreen')}} style={styles.text}>Prescreen</Text>
          <Text onPress={() => { navigate('SignUp')}} style={styles.text}>Step 0: Sign Up</Text>
          <Text onPress={() => { navigate('Login')}} style={styles.text}>Step 0.5: Log In</Text>
          <Text onPress={() => { navigate('Template')}} style={styles.text}>Step 1: Template</Text>
          <Text onPress={() => { navigate('PresetPalettes')}} style={styles.text}>Step 2: Color</Text>
          <Text onPress={() => { navigate('Keywords')}} style={styles.text}>Step 3: Keywords</Text>
          <Text onPress={() => { navigate('Title')}} style={styles.text}>Step 4: Title</Text>
          <Text onPress={() => { navigate('ConfirmSite')}} style={styles.text}>Step 5: Confirm Selection</Text>
          <Text onPress={() => { navigate('ShareScreen')}} style={styles.text}>Step 6: Share Link </Text>
          <Text onPress={() => { navigate('Page')}} style={styles.text}>Final Page</Text>
          <Text onPress={() => { navigate('UserEdit')}} style={[styles.text, styles.inDev]}>In dev: User Editing</Text>
          <Text onPress={() => { navigate('Saved')}} style={[styles.text, styles.inDev]}>In dev: Saved Pages</Text>
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


