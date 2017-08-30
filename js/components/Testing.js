import React from 'react';
import { Text, View, WebView, Button } from 'react-native';
import Swiper from 'react-native-swiper';

const styles = {
  wrapper: {},
  slides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  }
}

export default class PageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      css: '',
      title: 'new title',
      js: js,
      webview: ''
    }
    this.handlePress = this.handlePress.bind(this);
    this.reload = this.reload.bind(this);
    this.customReload = this.customReload.bind(this);
  };


  componentDidMount() {
    this.setState({html: html})
    var newjs = this.state.js.replace('REPLACE_ME', 'replaced');
    console.log('new js', newjs);
    this.setState({js: newjs})

  }

  handlePress() {
    //needs an old and new replacement variable
    var newjs = this.state.js.replace('replaced', 'replaced again');
    console.log('new js', newjs);
    var temp = this.state.html;
    //reload the page when state of js is changed using callback in setState
    this.setState({js: newjs}, () => {
      this.setState({html: ''}, () => {
        this.setState({html: temp})
      })})
  }
  reload() {
    this.refs.webview.reload();
  }

  customReload() {
    console.log('custom reload')
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
          
          >
        </WebView>
        <Button title={'Submit'} onPress={this.handlePress} />
      </View>
    )
  };
}

        // <WebView 
        //   source={{html: this.state.html}} 
        //   injectedJavaScript={this.state.js}
        // />
//html and css

var title = 'default';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, maximum-scale=1" />
<title>
  Simple
</title>

<!-- Stylesheets -->
<link rel='stylesheet' href='style.css' />
<link rel='stylesheet' href='css/header.css' />
<link rel='stylesheet' href='css/typography.css' />

<!-- TODO: Meta tags -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>

  <div class="outer-wrap">
    <header class="hero">
      <div class="centered">
        <h1 class="site-title">Demo</h1>
      </div>
    </header>
  </div>

  <div class="content">
    <main class="main-area">
      <article class="post-content">
        <h2>Lorem ipsum</h2>
        <p>Dolor amit</p>
      </article>
    </main>
  </div>

  <footer class="footer-area">
    <p>Footer</p>
  </footer>

</body>

</html>`;


const diffHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, maximum-scale=1" />
<title>
  Simple
</title>

<!-- Stylesheets -->
<link rel='stylesheet' href='style.css' />
<link rel='stylesheet' href='css/header.css' />
<link rel='stylesheet' href='css/typography.css' />

<!-- TODO: Meta tags -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>

<body>

  <div class="outer-wrap">
    <header class="hero">
      <div class="centered">
        <h1 class="site-title">THIS IS DIFFERENT</h1>
      </div>
    </header>
  </div>

  <div class="content">
    <main class="main-area">
      <article class="post-content">
        <h2>Lorem ipsum!</h2>
        <p>Dolor amit!</p>
      </article>
    </main>
  </div>

  <footer class="footer-area">
    <p>Footer</p>
  </footer>

</body>

</html>`;

const css = `/*---------------
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
}

@media screen and (min-width: 52em) {
    .centered {
        max-width: 52em;
    }
}`


const js = `
  $(document).ready(function(){
    $('.site-title').click(function(){
      $(this).html('REPLACE_ME')
    })
  })
`


//chetans notes
//document.title = newTitle; -set the tab title using js

//A Selection object represents the range of text selected 
//by the user or the current position of the caret. To 
//obtain a Selection object for examination or modification, 
//call window.getSelection().

//SET UP OVERLAY
//USE OVERLAY TO EDIT TITLE
