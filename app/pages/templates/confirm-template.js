
export default const html = `<!DOCTYPE html>
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
        bgColor: null,
        textcontent: 'TextContent',
        sitePreferences: {
          components: [
            {
              componentName: <Hero1 />,
              attr: {
                bgColor: '#eee',
                title: 'Custom title',
              }
            },
            {
              componentName: <TextContent />,
              attr: {
                title: 'With All Eyes on the South, the Most Important Art Show in America Is Underway in Pittsburgh',
                body: 'The exhibition—which features works from the likes of Kerry J. Marshall, Jenny Holzer, Kara Walker, and Lorna Simpson—begins with “A More Perfect Union,” an examination of national identity and symbols.'
              }
            },
            {
              componentName: <Footer />,
              attr: {
                text: 'I am foot'
              }
            }
          ]
        },
      }
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
    toComponents(raw) {
      // Components is an array of objects {name: 'TextContent', attr: }
      // Converts component to array of objects {name: <TextContent />, attr: }
      var newObj = {components: []}
      raw.components.forEach((comp) => {
        comp.componentName = this.map(comp.componentName)
        newObj.components.push(comp)
      })
      return newObj;
    }
    componentDidMount() {
      socket.on('changePref', (sampleData) => {
        let newSitePreferences = this.toComponents(sampleData);
        this.setState({ sitePreferences: newSitePreferences })
    })
    }
    render() {
      return (
        <div>
          { this.state.sitePreferences.components.map((component, i) => {
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
        title: 'New page',
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
          <p><EditableShortText value="Footer" /></p>
        </footer>
      )
    }
  }
  ReactDOM.render(<Parent/>, document.getElementById('parent'));
</script>
</body>
</html>`