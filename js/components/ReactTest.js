import React from 'react';
import { Text, View, WebView, Button } from 'react-native';
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:8080', { transports: ['websocket'] });

export default class ReactTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  componentDidMount() {
    socket.on('titleChange', (data) => {
      console.log('pinging modal to come up');
      console.log('data', data);
    });
  }

  render() {
    return (
      <WebView
        source={{uri: `${global.HOST}/pages/templates/full.html`}}
      />
    )
  };
}