import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appendPrefs } from './actions/index';
const io = require('socket.io-client');
const socket = io(global.HOST, { transports: ['websocket'] });

class Sockets extends React.Component {
  componentDidMount() {
    console.log('sockets');
    socket.on('addPrefDomStore', (addition) => {
      console.log('addition', addition);
      this.props.appendPrefs(addition)
    });
  }
}

function mapStateToProps({ preferences }) {
  return { preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({appendPrefs}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(Sockets);