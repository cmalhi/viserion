import React from 'react';
import { Text, View, WebView } from 'react-native';

export default class PageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      css: '',
    }
  };

  componentDidMount() {
    console.log('HELLO', html)
    this.setState({html: html}, ()=>{console.log('html', this.state.html)})
    console.log('suh')
  }

  render() {
    return (
        <WebView source={{html: this.state.html}} />
    )
  };
}


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