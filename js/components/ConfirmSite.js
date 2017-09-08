import React from 'react'
import {
  Text,
  View,
  WebView,
  Button
} from 'react-native'
import Swiper from 'react-native-swiper'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addSite, selectPreferences } from '../actions/index';
import axios from 'axios';
import htmlTemplate from '../htmlTemplate';

var source =  [{uri: 'http://google.com'},{uri: 'http://nfl.com'},{uri: 'http://cnn.com'}];

class ConfirmSite extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          uris: [htmlTemplate],
      }
      this.handlePress = this.handlePress.bind(this);
      // this.getURIs = this.getURIs.bind(this);
  }

  componentDidMount(){
    // this.getURIs()
    console.log(htmlTemplate);
    console.log(this.props.preferences);
  }

 // getURIs(){
 //    axios.get(`${global.HOST}/usertemplates/list`)
 //    .then((response) => {
 //      var result = response.data.map(function(val){
 //        var site = `${global.HOST}/${val}`;
 //        return {uri: site}
 //      });
 //      console.log("result", result)
 //      this.setState({uris: [...result]}, console.log('results from getURIs ', this.state.uris))
 //      //cb(source)
 //    }).catch(function(err){
 //      console.log('There was an error(msg):',err);
 //    })  
  // }

  handlePress(index){
    const { navigate } = this.props.navigation; 
    this.props.addSite(this.state.uris[index].uri);
    navigate('ShareScreen');   
  }

  render() {
    if(this.props.preferencesAll.length){
      var slides = [];
      for(var u = 0; u < this.props.preferencesAll.length; u +=1) {

        const html = this.state.uris[0].replace('#{rawPreferences}', [{ 
          attr: {
            bgColor: "defaultColor",
            title: "defaultTitle",
            },
          componentName: "Hero",
          name: "My Hero",
          },
          { 
          attr: {
            bgColor: "defaultColor",
            title: "defaultTitle",
            },
          componentName: "TextContent",
          name: "My Hero",
          },

          {
          attr: {
            bgColor: "defaultColor",
            text: "defaultText",
          },
          componentName: "Footer",
            name: "My Footer",
        }])
        console.log('html .>>>>>>', html);
        slides.push(
          <View key={u} style={styles.slides}>
            <WebView style={{padding: 10, width:350 }}
              automaticallyAdjustContentInsets={false}
              scrollEnabled={true}
              scalesPageToFit={true}
              source={{html:html}}>
            </WebView>
            <Button title={'Submit'} onPress={this.handlePress.bind(this, u)} />
          </View>
        )
      }
      return (
        <Swiper style={styles.wrapper} showsButtons>
          {slides} 
        </Swiper>
      ) 
    } else {
      return(<Text>Loading...</Text>)
    }
  }  
}

const styles = {
  wrapper: {},
  slides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addSite, selectPreferences}, dispatch)
};

const mapStateToProps = ({preferencesAll}) => {
  return {preferencesAll};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSite);