import React from 'react';
import { Text, View, WebView, Button } from 'react-native';

export default class ReactTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: html,
      js: js,
    };
  };
  componentDidMount() {
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
  var MyComponent = React.createClass({
    displayName: 'MyComponent',
  
    render: function render() {
      return React.createElement(
        'div',
        null,
        'Hello'
      );
    }
  });

  ReactDOM.render(React.createElement(MyComponent, null), document.getElementById('container'));
`;