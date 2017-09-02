import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
const io = require('socket.io-client');
import ImageModal from './modals/ImageModal';
import TextModal from './modals/TextModal';
import ColorModal from './modals/ColorModal';
import OrderModal from './modals/OrderModal';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

var {
  height: deviceHeight
} = Dimensions.get('window');

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textModal: false,
      title: '',
      order: this.props.order,
      imageModal: false,
      colorModal: false,
      orderModal: false,
      html: html,
      componentOrder: compOrderPref,
    }
    this.handleRearrange = this.handleRearrange.bind(this);
  };

  componentDidMount() {
    const socket = io(global.HOST, { transports: ['websocket'] });

    socket.on('titleChange2', (title) => {
      this.setState({ title, textModal: true });
    });

    socket.on('imgChange', (img) => {
      this.setState({ imageModal: true });
    });

    socket.on('colorChange', (data) => {
      this.setState({ colorModal: true });
    });
  }

  handleRearrange() {
    this.setState({ orderModal: true });
  }

  render() {
    return (
      <View style={styles.flexContainer}>

        <WebView style={styles.webView} source={{uri: `${global.HOST}/pages/templates/reactify.html`}} />
        {this.state.textModal ? <TextModal title={this.state.title} closeModal={() => this.setState({textModal: false}) } /> : null}
        {this.state.imageModal ? <ImageModal closeModal={() => this.setState({imageModal: false})} /> : null}
        {this.state.colorModal ? <ColorModal navigation={this.props.navigation} closeModal={() => this.setState({colorModal: false})} /> : null}
        {this.state.orderModal ? <OrderModal closeModal={() => this.setState({orderModal: false})} /> : null}
        <Button title="Rearrange (click this 2x)" onPress={this.handleRearrange}></Button>

      </View>
    )
  };
}

function mapStateToProps({ order }) {
  return { order };
}

export default connect(mapStateToProps, null)(UserEdit);

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

const compOrderPref = ["React.createElement(Title, null)", "React.createElement(MyComponent, null)", "React.createElement(Body, null)", "React.createElement(MyComponent2, null)", "React.createElement(Gallery, null)", "React.createElement(Pricing, null)", "React.createElement(Footer, null)"];

const html = `
<!DOCTYPE html>
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js"></script>
<script src="http://127.0.0.1:8080/socket.io/socket.io.js"></script>
<script> var socket = io('http://127.0.0.1:8080');</script>
</head>
<title>
  React
</title>
<body>
<div id="container">
<script>

  var MyComponent2 = React.createClass({
    displayName: 'MyComponent2',

    getInitialState: function() {
      return {message: 'hi'};
    },
    
    componentDidMount: function() {
    },

    handleClick: function() {
      var type = typeof socket;
      this.setState({message: this.state.message + type})
      socket.emit('order', 'OOOOO')
    },  

    render: function render() {
      return React.createElement(
        'div',
        { fontSize: 60, fontWeight: 'bold', onClick: this.handleClick },
        this.state.message,
      );
    }
  });
  var MyComponent = React.createClass({
    displayName: 'MyComponent',
  
    render: function render() {
      return React.createElement(
        'div',
        { fontSize: 60, fontWeight: 'bold' },
        'This is a lame component'
      );
    }
  });
var Title = React.createClass({
  displayName: 'Title',
  
  getInitialState: function() {
    return {title: 'Click me Edit me :)'};
  },

  componentDidMount: function() {
    socket.on('titleChange2', (data) => {
      this.setState({title: data})
    })
  },

  handleClick: function () {
    socket.emit('titleChange', this.state.title)
    this.setState({title: 'Editing'})
  },

  render: function render() {
    return React.createElement(
      'div',
      { fontSize: 60, fontWeight: 'bold', onClick: this.handleClick },
      this.state.title,
    );
  }
});

var Body = React.createClass({
  displayName: 'Body',

  getInitialState: function() {
    return {text: 'This is the body! oooOOoOo (Click to edit)'};
  },
  handleClick: function () {
    socket.emit('titleChange', this.state.text)
  },

  render: function render() {
    return React.createElement(
      'div',
      { fontSize: this.state.fontsize, fontWeight: 'bold', onClick: this.handleClick },
      this.state.text,
    );
  }
});


var Pricing = React.createClass({
  displayName: 'Pricing',

  render: function render() {
    return React.createElement(
      'div',
      { fontSize: 30, fontWeight: 'bold' },
      'This is the Pricing Component! (Take my money)'
    );
  }
});

var Gallery = React.createClass({
  displayName: 'Gallery',

  render: function render() {
    return React.createElement(
      'div',
      { fontSize: 30, fontWeight: 'bold' },
      'This is the gallery Component! (Take my picture)'
    );
  }
});

var Footer = React.createClass({
  displayName: 'Footer',

  render: function render() {
    return React.createElement(
      'div',
      { fontSize: 30, fontWeight: 'bold' },
      'This is the Footer Component! (Take my foot)'
    );
  }
});
  var compArr = [React.createElement(Title, null), React.createElement(Title, null), React.createElement(Body, null), React.createElement(Pricing, null), React.createElement(MyComponent2, null), React.createElement(Footer, null)];
  var components = React.createElement(
    "div",
    null, 
    ...compArr
  );
  ReactDOM.render(components, document.getElementById('container'));
</script>

<script>
  var socket = io.connect('http://localhost/')(8080);
  socket.on('connect', function (data) {
    alert('signed TextInput');
  });
</script>
</div>
</body>
`;
