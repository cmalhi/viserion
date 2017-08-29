import React from 'react';
import { Image, View, Text} from 'react-native';
import axios from 'axios';
const HOST = 'http://ec2-54-203-8-222.us-west-2.compute.amazonaws.com:8080';

export default class SavedPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { templates: [] };
  }

  componentDidMount() {
    // TODO: Get templates from userTemplates
    axios.get(HOST + '/usertemplates/all')
      .then((res) => {
        this.setState({ templates: res.data });
      })
      .catch((err) => console.log('Err getting /usertemplates/all: ', err));
  }

  render() {
    let images = [];
    if (this.state.templates.length > 0){
      // Pull just the URLs
      images = this.state.templates.map((t) => {
        return (
          <View>
            <Text>{t['_id']}</Text>
            { t.screenshot && <Image key={t['_id']} style={{width:400, height: 200}} source={require('./example.png')} resizeMode="contain" /> }
          </View>
        )
      })
    }
    return (
      <View>
        <Text>Saved pages</Text>
        {images}
      </View>
    )
  }
}