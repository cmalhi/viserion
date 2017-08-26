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
import { addSite } from '../actions/index';

const styles = {
  wrapper: {},
  slides: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  }
}

var source =  [{uri: 'http://google.com'},{uri: 'http://spotify.com'},{uri: 'http://nfl.com'},{uri: 'http://cnn.com'}];

class ConfirmSite extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        uris: []
      }
      this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount(){
    this.setState({uris: [...this.state.uris, ...source]},console.log('source',...source));
  }

  handlePress(index){
    this.props.addSite(this.state.uris[index].uri);
    console.log('The URI clicked was',this.state.uris[index].uri);
  }

  render() {
    var slides = [];
    for(var u = 0; u < this.state.uris.length; u +=1) {
      slides.push(<View key={u} style={styles.slides}>
                    <WebView style={{padding: 20, width:400}}
                    automaticallyAdjustContentInsets={false}
                    scrollEnabled={true}
                    source={this.state.uris[u]}>
                    </WebView>
                    <Button  title="Submit" onPress={this.handlePress.bind(this, u)} />
                  </View>
      )

    }
    return (
      <Swiper style={styles.wrapper} showsButtons>
        {slides} 
      </Swiper>
    )
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({addSite}, dispatch)
}

export default connect(null, matchDispatchToProps)(ConfirmSite);