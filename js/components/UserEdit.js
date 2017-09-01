import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
const io = require('socket.io-client');
import ImageModal from './modals/ImageModal';
import TextModal from './modals/TextModal';
import ColorModal from './modals/ColorModal';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';

var {
  height: deviceHeight
} = Dimensions.get('window');

export default class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textModal: false,
      title: '',
      imageModal: false,
      colorModal: false,
      html: html,
    }
  };

  componentDidMount() {
    const socket = io(global.HOST, { transports: ['websocket'] });

    socket.on('titleChange', (title) => {
      this.setState({ title, textModal: true });
    });

    socket.on('imgChange', (img) => {
      this.setState({ imageModal: true });
    });

    socket.on('colorChange', (data) => {
      console.log('colorChange data', data);
      this.setState({ colorModal: true });
    });
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <WebView style={styles.webView} source={{html: this.state.html}} />
        {this.state.textModal ? <TextModal title={this.state.title} closeModal={() => this.setState({textModal: false}) } /> : null}
        {this.state.imageModal ? <ImageModal closeModal={() => this.setState({imageModal: false})} /> : null}
        {this.state.colorModal ? <ColorModal closeModal={() => this.setState({colorModal: false})} /> : null}
      </View>
    )
  };
}

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

const htmlz = `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, maximum-scale=1" />
  <title>
    Simple
  </title>



  <!-- Stylesheets -->

  <!-- TODO: Meta tags -->
</head><style type="text/css">
  /*---------------
      #Header
  ---------------*/

  .hero {
    background: #ffd5c9;
  }

  .site-title {
    margin: 0 0 1em;
    padding: 1em 0;
    font-size: 2em;
    font-weight: 300;
    text-align: center;
    color: black;
  }

  @media screen and (min-width: 44.44em) {
    .site-title {
      font-size: 2em;
    }
  }

  @media screen and (min-width: 50em) {
    .site-title {
      font-size: 2.5em;
    }
  }

  .site-title a {
    color: hsl(5, 45%, 95%);
    text-decoration: none;
  }

  .site-title a:hover {
    text-decoration: underline;
  }

  /*---------------
      #Housekeeping
  ---------------*/
  /* CSS Reset to correct browser inconsistencies */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /*---------------
      #Content
  ---------------*/

  .post-content {
    padding: 0 1.4em 1.4em;
  }

  .image-component {
    display: flex;
    align-items: flex-start; /* align vertical */
    justify-content: center; /* align horizontal */
    height: auto;
  }
  .figure {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }
  .figcaption {
    text-align: left;
    margin: 10px;
  }
  .pic {
    max-width: 80vw;
    max-height: 80vh;
  }


  /*---------------
    #Content-Grid
---------------*/

  #columns {
    column-width: 320px;
    column-gap: 15px;
    width: 90%;
    max-width: 1100px;
    margin: 50px auto;
  }

  div#columns figure {
    background: #eee;
    margin: 0 2px 15px;
    padding: 15px;
    padding-bottom: 10px;
    display: inline-block;
    column-break-inside: avoid;
  }

  div#columns figure img {
    width: 100%;
    height: auto;
    padding-bottom: 15px;
    margin-bottom: 5px;
  }


  @media screen and (max-width: 750px) {
    #columns { column-gap: 0px; }
    #columns figure { width: 100%; }
  }

  /*---------------
      #Footer
  ---------------*/

  .footer-area {
    padding: .4em 1em;
    text-align: center;
    background: hsl(0, 0%, 75%);
  }

  /*---------------
      #Layouts
  ---------------*/

  .centered {
    margin: 0 auto;
    padding: 0 1em;
    text-align: center;
  }

  @media screen and (min-width: 52em) {
    .centered {
      max-width: 52em;
    }
  }

  /*---------------
      #Typography
  ---------------*/

  body,
  button,
  input,
  select,
  textarea {
    color: #404040;
    font-family: 'Helvetica', Arial, sans-serif;
    font-size: 18px;
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    clear: both;
  }

  p {
    margin-bottom: 1.5em;
  }

  b,
  strong {
    font-weight: bold;
  }

  dfn,
  cite,
  em,
  i {
    font-style: italic;
  }

  blockquote {
    margin: 0 1.5em;
  }

  address {
    margin: 0 0 1.5em;
  }

  pre {
    background: #eee;
    font-family: "Courier 10 Pitch", Courier, monospace;
    font-size: 15px;
    font-size: 1.5rem;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1.6em;
  }

  code,
  kbd,
  tt,
  var {
    font: 15px Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
  }

  abbr,
  acronym {
    border-bottom: 1px dotted #666;
    cursor: help;
  }

  mark,
  ins {
    background: #fff9c0;
    text-decoration: none;
  }

  sup,
  sub {
    font-size: 75%;
    height: 0;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    bottom: 1ex;
  }

  sub {
    top: .5ex;
  }

  small {
    font-size: 75%;
  }

  big {
    font-size: 125%;
  }
</style>
<div class="outer-wrap">
  <header class="hero header1">
    <div class="centered">
      <span class="site-title">Hi</span>
    </div>
  </header>
</div><div class="content">
  <main class="main-area">
    <div id="columns">
      <figure>
        <img src="https://68.media.tumblr.com/8c03ff7f9a45832be4a65783b5c39ecb/tumblr_ovebbfcc3S1s2tva9o1_1280.jpg" class="img1" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/3523f18b84d111ca2d39797c766d6ab8/tumblr_ov7e3t3Dg61s2tva9o1_1280.jpg" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/dd9ef337da64596dad08baf332e7c91e/tumblr_ovebc0U7381s2tva9o1_1280.jpg" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/bf224896567a05f502931d1f738cec85/tumblr_oubn37DsUk1s2tva9o1_1280.jpg" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/c0f6f53319b37c3dd46158438739a5ae/tumblr_oubn9jascg1s2tva9o1_1280.jpg" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/aac121c777631aa1ef756fd4164a004f/tumblr_oubn8iPPLG1s2tva9o1_1280.jpg" />
      </figure>
    </div>
  </main>
</div><footer class="footer-area">
  <p>Footer</p>
</footer>

<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script src="http://127.0.0.1:8080/socket.io/socket.io.js"></script>
<script type="text/javascript">
//  $(function() {
  $(document).ready(function() {
    // TODO make global variable and pull from global.HOST
    var socket = io('http://127.0.0.1:8080');
//    var socket = io('http://ec2-54-203-8-222.us-west-2.compute.amazonaws.com:8080');
    $title = $('.site-title');
    $img1 = $('.img1');
    $header1 = $('.header1');

    // Title
    $title.click(() => {
      socket.emit('titleChange', $title.text());
    });

    socket.on('titleChange2', (title) => {
      $title.text(title);
    });

    // Images
    $img1.click(() => {
      socket.emit('imgChange', 'change me change me!!!');
    });

    socket.on('imgChange2', (img) => {
      $img1.attr('src', img);
    });

    // Colors
    $header1.click(() => {
      socket.emit('colorChange', 'change ID x!');
    });

  });
</script>
</body></html>`



const htmly = `
<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, maximum-scale=1" />
  <title>
    Simple
  </title>



  <!-- Stylesheets -->

  <!-- TODO: Meta tags -->
</head><style type="text/css">
  /*---------------
      #Header
  ---------------*/

  .hero {
    background: #ffd5c9;
  }

  .site-title {
    margin: 0 0 1em;
    padding: 1em 0;
    font-size: 2em;
    font-weight: 300;
    text-align: center;
    color: black;
  }

  @media screen and (min-width: 44.44em) {
    .site-title {
      font-size: 2em;
    }
  }

  @media screen and (min-width: 50em) {
    .site-title {
      font-size: 2.5em;
    }
  }

  .site-title a {
    color: hsl(5, 45%, 95%);
    text-decoration: none;
  }

  .site-title a:hover {
    text-decoration: underline;
  }

  /*---------------
      #Housekeeping
  ---------------*/
  /* CSS Reset to correct browser inconsistencies */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /*---------------
      #Content
  ---------------*/

  .post-content {
    padding: 0 1.4em 1.4em;
  }

  .image-component {
    display: flex;
    align-items: flex-start; /* align vertical */
    justify-content: center; /* align horizontal */
    height: auto;
  }
  .figure {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }
  .figcaption {
    text-align: left;
    margin: 10px;
  }
  .pic {
    max-width: 80vw;
    max-height: 80vh;
  }


  /*---------------
    #Content-Grid
---------------*/

  #columns {
    column-width: 320px;
    column-gap: 15px;
    width: 90%;
    max-width: 1100px;
    margin: 50px auto;
  }

  div#columns figure {
    background: #eee;
    margin: 0 2px 15px;
    padding: 15px;
    padding-bottom: 10px;
    display: inline-block;
    column-break-inside: avoid;
  }

  div#columns figure img {
    width: 100%;
    height: auto;
    padding-bottom: 15px;
    margin-bottom: 5px;
  }


  @media screen and (max-width: 750px) {
    #columns { column-gap: 0px; }
    #columns figure { width: 100%; }
  }

  /*---------------
      #Footer
  ---------------*/

  .footer-area {
    padding: .4em 1em;
    text-align: center;
    background: hsl(0, 0%, 75%);
  }

  /*---------------
      #Layouts
  ---------------*/

  .centered {
    margin: 0 auto;
    padding: 0 1em;
    text-align: center;
  }

  @media screen and (min-width: 52em) {
    .centered {
      max-width: 52em;
    }
  }

  /*---------------
      #Typography
  ---------------*/

  body,
  button,
  input,
  select,
  textarea {
    color: #404040;
    font-family: 'Helvetica', Arial, sans-serif;
    font-size: 18px;
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    clear: both;
  }

  p {
    margin-bottom: 1.5em;
  }

  b,
  strong {
    font-weight: bold;
  }

  dfn,
  cite,
  em,
  i {
    font-style: italic;
  }

  blockquote {
    margin: 0 1.5em;
  }

  address {
    margin: 0 0 1.5em;
  }

  pre {
    background: #eee;
    font-family: "Courier 10 Pitch", Courier, monospace;
    font-size: 15px;
    font-size: 1.5rem;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1.6em;
  }

  code,
  kbd,
  tt,
  var {
    font: 15px Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
  }

  abbr,
  acronym {
    border-bottom: 1px dotted #666;
    cursor: help;
  }

  mark,
  ins {
    background: #fff9c0;
    text-decoration: none;
  }

  sup,
  sub {
    font-size: 75%;
    height: 0;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    bottom: 1ex;
  }

  sub {
    top: .5ex;
  }

  small {
    font-size: 75%;
  }

  big {
    font-size: 125%;
  }
</style>
<div class="outer-wrap">
  <header class="hero header1">
    <div class="centered">
      <span class="site-title">Hi</span>
    </div>
  </header>
</div><div class="content">
  <main class="main-area">
    <div id="columns">
      <figure>
        <img src="https://68.media.tumblr.com/8c03ff7f9a45832be4a65783b5c39ecb/tumblr_ovebbfcc3S1s2tva9o1_1280.jpg" class="img1" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/3523f18b84d111ca2d39797c766d6ab8/tumblr_ov7e3t3Dg61s2tva9o1_1280.jpg" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/dd9ef337da64596dad08baf332e7c91e/tumblr_ovebc0U7381s2tva9o1_1280.jpg" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/bf224896567a05f502931d1f738cec85/tumblr_oubn37DsUk1s2tva9o1_1280.jpg" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/c0f6f53319b37c3dd46158438739a5ae/tumblr_oubn9jascg1s2tva9o1_1280.jpg" />
      </figure>
      <figure>
        <img src="https://68.media.tumblr.com/aac121c777631aa1ef756fd4164a004f/tumblr_oubn8iPPLG1s2tva9o1_1280.jpg" />
      </figure>
    </div>
  </main>
</div><footer class="footer-area">
  <p>Footer</p>
</footer>

<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script src="/socket.io/socket.io.js"></script>
<script type="text/javascript">
//  $(function() {
  $(document).ready(function() {
    // TODO make global variable and pull from global.HOST
    var socket = io('http://127.0.0.1:8080');
//    var socket = io('http://ec2-54-203-8-222.us-west-2.compute.amazonaws.com:8080');
    $title = $('.site-title');
    $img1 = $('.img1');
    $header1 = $('.header1');

    // Title
    $title.click(() => {
      socket.emit('titleChange', $title.text());
    });

    socket.on('titleChange2', (title) => {
      $title.text(title);
    });

    // Images
    $img1.click(() => {
      socket.emit('imgChange', 'change me change me!!!');
    });

    socket.on('imgChange2', (img) => {
      $img1.attr('src', img);
    });

    // Colors
    $header1.click(() => {
      socket.emit('colorChange', 'change ID x!');
    });

  });
</script>
</body></html>
`

const html = `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, maximum-scale=1" />
  <title>
    Simple
  </title>



  <!-- Stylesheets -->

  <!-- TODO: Meta tags -->
</head>

<div class="container">
</div>
<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.js"></script>
<script src="http://127.0.0.1:8080/socket.io/socket.io.js"></script>
<script type="html/javascript">
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
      socket.emit('titleChange', 'OOOOO')
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
</script>
</html>
`

