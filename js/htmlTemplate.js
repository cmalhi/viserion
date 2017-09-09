export default (rawPreferencesObj) => {
  var rawPreferences = JSON.stringify(rawPreferencesObj)
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.css">
  <link rel="stylesheet" href="./style.css">
  <title>Simple</title>
</head>
<body>
<script src="https://fb.me/react-15.0.0.js"></script>
<script src="https://fb.me/react-dom-15.0.0.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
<script src="http://127.0.0.1:8080/socket.io/socket.io.js"></script>
<style type="text/css">
/*---------------
      #Header
  ---------------*/

.hero {
    background: #ffd5c9;
}

.hero.hero-wrapper{
    /*height: 80%;*/
    height: calc(100vh - 157px);
    display: flex;
    align-items: center;
    justify-content: center;
}

/*.content.hero2body {*/
/*top: 145vh;*/
/*}*/

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

/* If viewport is 480px or larger */
@media screen and (min-width: 480px) {
    .content {
        width: 80%;
    }
}

/* Mobile */
.content {
    width: 90%;
    max-width: 1100px;
    margin: 50px auto 100px auto;
}

/*---------------
    #Image Caption
---------------*/

.image-content-wrapper {
    display: flex;
    align-items: flex-start; /* align vertical */
    justify-content: center; /* align horizontal */
    height: auto;
}

.image-content-inner-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
}

.image-scalable {
    max-width: 100vw;
    max-height: 100vh;
}

.image-scalable-container {
    max-width: 100%;
}

.figcaption {
    text-align: left;
    margin: 10px;
}

/*---------------
  #Pinterest Content
---------------*/

.columns {
    column-gap: 10px;
}

.columns.columns-image {
    column-width: 280px;
}

div.columns figure {
    margin: 0 2px 15px;
    padding: 15px;
    padding-bottom: 10px;
    display: inline-block;
    column-break-inside: avoid;
}

div.columns.columns-image figure {
    background: #eee;
}

div.columns figure img {
    width: 100%;
    height: auto;
    padding-bottom: 15px;
    margin-bottom: 5px;
}

@media screen and (max-width: 750px) {
    .columns { column-gap: 0px; }
    .columns figure { width: 100%; }
}

/*---------------
  #Pinterest Text
---------------*/

/* If viewport is 480px or larger */
@media screen and (min-width: 480px) {
    .content.content-60 {
        width: 60%;
    }
}

.columns.columns-text {
    column-width: 280px;
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
    line-height: 1.3em;
    margin-bottom: 0.5em;
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

bigger {
    font-size: 350%;
    font-weight: bold;
    line-height: 1em;
}

.color-inverse {
    color: #fff;
}
</style>
<div id="parent"></div>

<script type="text/babel">
  const socket = io('http://127.0.0.1:8080');
  // ID generation
  let lastId = 0;
  function newId(prefix='id') {
    lastId++;
    return (prefix + lastId).toString();
  }
  class Parent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rawPreferences: ${rawPreferences},
        sitePreferences: [
          
        ]
      };
      this.map = this.map.bind(this);
      this.toComponents = this.toComponents.bind(this);
    }

    map(name) {
      const components = {
        Hero: {
          componentName: <Hero1 />,
        },
        ImageContent: {
          componentName: <ImageContent />,
        },
        PinterestContent: {
          componentName: <PinterestContent />,
        },
        ImageCaption: {
          componentName: <ImageCaption/>,
        },
        TextContent: {
          componentName: <TextContent />,
        },
        Footer: {
          componentName: <Footer />,
        },
      };
      if (components[name]){
        return components[name].componentName;
      }
    }

    /*
     * toComponent(raw) takes in an object and converts the object to a React-friendly version
     * Input: obj of shape { componentName: 'TextContent', attr: {} }
     * Output: obj { component: <TextContent />, attr: {} }
     */
    toComponent(raw) {
      var res = {...raw};
      res.componentName = this.map(res.componentName);
      return res;
    }

    /* Input: Raw is an array of objects [{componentName: 'TextContent', attr: }]
     * Output: Converts component to array of objects {componentName: <TextContent />, attr: }
     */
    toComponents(raw) {
      var res = [];
      raw.forEach((comp) => {
//        comp.componentName = this.map(comp.componentName)
        var newComp = this.toComponent(comp)
        res.push(newComp)
      });
      return res;
    }

    componentDidMount() {
      
      let newPref = this.toComponents(this.state.rawPreferences);
      this.setState({ sitePreferences: newPref})
    
      // this.setState({ sitePreferences: [{componentName: <Hero />, attr: {title: 'hi'}}] });

      // Web client listens to 'addPrefDomStore' event emitted when the user hits 'Submit'
      socket.on('addPrefDomStore', (addition) => {
        let newPref = this.state.sitePreferences; // Copy old site preferences
        newPref = [...newPref, this.toComponent(addition)];
        this.setState({ sitePreferences: newPref });
      });

      socket.on('updatePrefDomStore', (newPref) => {
        this.setState({ sitePreferences: this.toComponents(newPref) });
      });
    }
    render() {
      return (
        <div>
          { this.state.sitePreferences.map((component, i) => {
            const child = component.componentName;
            const props = component.attr;
            return React.cloneElement(child, Object.assign(props, { key: i }));
          }) }
        </div>
      )
    }
  }
  class Hero1 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bgColor: this.props.bgColor,
        title: this.props.title,
      };
      this.handleHeaderClick = this.handleHeaderClick.bind(this);
    }
    componentDidMount() {
      socket.on('colorChange2', (bgColor) => {
        this.setState({ bgColor })
      })
    }
    handleHeaderClick() {
      socket.emit('colorChange', 'change ID x!');
    }
    render() {
      return (
        <div className="outer-wrap">
          <header
            className="hero header1"
            onClick={this.handleHeaderClick}
            style={{ backgroundColor: this.state.bgColor }}
          >
            <div className="centered">
              <span className="site-title"><EditableShortText value={this.state.title} /></span>
            </div>
          </header>
        </div>
      )
    }
  }
  class ImageContent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        imageUrl: this.props.imageUrl,
        mainTitle: this.props.mainTitle,
        subtitle1: this.props.subtitle1,
        body1: this.props.body1,
        subtitle2: this.props.subtitle2,
        body2: this.props.body2,
        subtitle3: this.props.subtitle3,
        body3: this.props.body3,
      }
    }
    render() {
      return(
        <div className="content">
          <div className="row middle-md">
            <div className="col-xs-12 col-sm-7 col-md-5">
              <div className="box">
                <h1><EditableShortText value={this.state.mainTitle} /></h1>
                <p>
                  <h3><EditableShortText value={this.state.subtitle1} /></h3>
                  <EditableLongText body={this.state.body1} />
                </p>
                <p>
                  <h3><EditableShortText value={this.state.subtitle2} /></h3>
                  <EditableLongText body={this.state.body2} />
                </p>
                <p>
                  <h3><EditableShortText value={this.state.subtitle3} /></h3>
                  <EditableLongText body={this.state.body3} />
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-sm-offset-1 col-md-6">
              <div className="box">
                <EditableImage src={this.state.imageUrl} />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  class EditableLongText extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        body: this.props.body,
        key: newId(),
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      socket.on('changeLongTextDom2', (data) => {
        if (data.key === this.state.key) this.setState({ body: data.textValue })
      })
    }
    handleClick(e) {
      socket.emit('launchLongTextModal', {key: this.state.key, textValue: this.state.body});
    }
    render() {
      return(
        <span onClick={this.handleClick}>{this.state.body}</span>
      )
    }
  }
  class EditableShortText extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        color: this.props.color,
        textValue: this.props.value,
        key: newId(),
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      socket.on('changeTitleDom2', (data) => {
        if (data.key === this.state.key) this.setState({ textValue: data.textValue });
      })
    }
    handleClick(e) {
      e.stopPropagation();
      socket.emit('launchTitleModal', {key: this.state.key, textValue: this.state.textValue});
    }
    render() {
      return(
        <span style={{color: this.state.color}} key={this.state.key} onClick={this.handleClick}>{this.state.textValue}</span>
      )
    }
  }
  class PinterestText extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        content: this.props.content,
      }
    }
    render() {
      const items = this.state.content.map((item, i) => {
        return (
          <figure key={i}>
            <h2><EditableShortText color={this.props.headerColor} value={item.title} /></h2>
            <EditableLongText body={item.body} />
          </figure>
        )
      });
      return (
        <div className="content content-60">
          <div className="columns columns-text">
            {items}
          </div>
        </div>
      )
    }
  }
  class EditableImage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        src: this.props.src,
        key: newId(),
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      socket.on('changeImageDom2', (data) => {
        if (data.key === this.state.key) this.setState({ src: data.src });
      });
    }
    handleClick() {
      socket.emit('launchImageModal', this.state.key);
    }
    render() {
      return (
        <img className="image-scalable-container" key={this.state.key} onClick={this.handleClick} src={this.state.src} />
      )
    }
  }
  class PinterestContent extends React.Component {
    render() {
      const imageUrls = [
        'https://68.media.tumblr.com/8c03ff7f9a45832be4a65783b5c39ecb/tumblr_ovebbfcc3S1s2tva9o1_1280.jpg',
        'https://68.media.tumblr.com/3523f18b84d111ca2d39797c766d6ab8/tumblr_ov7e3t3Dg61s2tva9o1_1280.jpg',
        'https://68.media.tumblr.com/dd9ef337da64596dad08baf332e7c91e/tumblr_ovebc0U7381s2tva9o1_1280.jpg',
        'https://68.media.tumblr.com/bf224896567a05f502931d1f738cec85/tumblr_oubn37DsUk1s2tva9o1_1280.jpg',
        'https://68.media.tumblr.com/c0f6f53319b37c3dd46158438739a5ae/tumblr_oubn9jascg1s2tva9o1_1280.jpg',
        'https://68.media.tumblr.com/aac121c777631aa1ef756fd4164a004f/tumblr_oubn8iPPLG1s2tva9o1_1280.jpg',
      ];
      const images = imageUrls.map((item, i) => {
        return (
          <figure key={i}>
            <EditableImage src={item}/>
          </figure>
        )
      });
      return (
        <div className="content">
          <div className="columns columns-image">
            {images}
          </div>
        </div>
      )
    }
  }
  class ImageCaption extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        imageUrl: this.props.imageUrl,
        caption: this.props.caption,
      }
    }
    render() {
      return (
        <div className="content">
          <div className="image-content-wrapper">
            <div className="image-content-inner-wrapper">
              <div className="figcaption">
                <EditableImage src={this.state.imageUrl} />
              </div>
              <i><EditableShortText value={this.state.caption} /></i>
            </div>
          </div>
        </div>
      )
    }
  }
  class TextContent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: this.props.title,
        body: this.props.body,
      }
    }
    render() {
      return (
        <div className="content">
          <h1><EditableShortText value={this.state.title} /></h1>
          <EditableLongText body={this.state.body} />
        </div>
      )
    }
  }
  class Footer extends React.Component {
    render() {
      return (
        <footer className="footer-area">
          <p><EditableShortText value={this.props.text} /></p>
        </footer>
      )
    }
  }
  ReactDOM.render(<Parent/>, document.getElementById('parent'));
</script>
</body>
</html>`
}