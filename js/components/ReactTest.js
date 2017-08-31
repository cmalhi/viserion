import React from 'react';
import { Text, View, WebView, Button } from 'react-native';
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:8080', { transports: ['websocket'] });

export default class ReactTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: html,
      js: js,
      prefs: userPrefrences,
    };
  };
  componentDidMount() {
    socket.on('add', {})
  }
  render() {
    return (
      <WebView
        source={{html: this.state.html}}
        injectedJavaScript={this.state.js}
      />
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
