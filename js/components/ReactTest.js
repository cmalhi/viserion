import React from 'react';
import { Text, View, WebView, Button, TextInput } from 'react-native';
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:8080', { transports: ['websocket'] });

export default class ReactTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: html,
      js: js,
      prefs: userPrefrences,
      order: '',
    };
    this.handlePress = this.handlePress.bind(this);
    this.listeners = this.listeners.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  componentDidMount() {
  }

  listeners() {
  }
  
  handlePress() {
  }
  handleSubmit() {
    var orderStr = this.state.order;
    var orderArr = orderStr.split('');
    console.log('This is the order string ',orderArr)
    var result = [];
    // map the components array here
    for (var i = 0; i < orderArr.length; i++) {
    //use switch when scaling this instead of chaining if statements
    //if element is 1 then push my component 1
      if (orderArr[i] === '1') {result.push('React.createElement(MyComponent, null)');}
      if (orderArr[i] === '2') {result.push('React.createElement(MyComponent2, null)');}
      console.log('the current result being pushed is ', result[i])
    }
    //if element is 2 then push my component 2
    //send the array to react client
    //react client updates state to re-render components
  }
  
  render() {
    return (
      <View style={styles.slides}>
        <WebView style={{padding: 10, width:320 }}
          ref='webview'
          automaticallyAdjustContentInsets={false}
          scrollEnabled={true}
          scalesPageToFit={true}
          source={{html: this.state.html}}
          javaScriptEnabled={true}
          injectedJavaScript={this.state.js}
          javaScriptEnabledAndroid={true}   
          >
        </WebView>
        <TextInput
          style={{height: 40}}
          placeholder="pick order"
          onChangeText={(order) => this.setState({order}, ()=> {console.log('order is now: ', this.state.order)})}
          onSubmitEditing={this.handleSubmit}
          clearButtonMode={'unless-editing'}
          keyboardType={"default"}
        />
        <Button title={'Submit'} onPress={this.handleSubmit} />
      </View>
    )
  };
}

var userPrefrences = {
  components: ["React.createElement(MyComponent, null)", "React.createElement(MyComponent2, null)"]
}

const html = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js"></script>
<body>
<div id="container">
container
</div>
</body>
`;

const js = `
  var MyComponent2 = React.createClass({
    displayName: 'MyComponent2',
  
    render: function render() {
      return React.createElement(
        'div',
        { fontSize: 60, fontWeight: 'bold' },
        'More lines'
      );
    }
  });
  var MyComponent = React.createClass({
    displayName: 'MyComponent',
  
    render: function render() {
      return React.createElement(
        'div',
        { fontSize: 60, fontWeight: 'bold' },
        'A line'
      );
    }
  });
  var compArr = [React.createElement(MyComponent, null), React.createElement(MyComponent2, null)];
  var components = React.createElement(
    "div",
    null, 
    ...compArr
  );
  ReactDOM.render(components, document.getElementById('container'));
`;

const styles = {
  wrapper: {},
  slides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  }
}

  //the components array will be pre sorted from the "add components" page


//   const html = `
// <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js"></script>
// <body>
// <div id="container">
// container
// </div>
// </body>
// `;

// const js = `
//   var MyComponent = React.createClass({
//     displayName: 'MyComponent',
  
//     render: function render() {
//       return React.createElement(
//         'div',
//         { fontSize: '90', fontWeight: 'bold' },
//         'Hello i am the first div that should render on this page'
//       );
//     }
//   });
  // var MyComponent2 = React.createClass({
  // displayName: 'MyComponent2',

  // render: function render() {
  //   return React.createElement(
  //     'div',
  //     { fontSize: 80, fontWeight: 'bold' },
  //     'Another line'
  //   );
  // }
// });
//   ReactDOM.render(React.createElement(MyComponent2, null), document.getElementById('container'));
// `;
