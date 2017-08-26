import React from 'react';
import { Image, View, Text} from 'react-native';
import axios from 'axios';

export default class SavedPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { templates: [] };
  }

  componentDidMount() {
    // TODO: Get templates from userTemplates
    axios.get('http://localhost:8080/usertemplates/all')
      .then((res) => {
        console.log(0)
        this.setState({ templates: res.data });
      })
      .catch((err) => console.log('Err getting /usertemplates/all: ', err));
  }

  render() {
    let images = [];
    if (this.state.templates.length > 0){
      console.log(1)
      // Pull just the URLs
      images = this.state.templates.map((t) => {
        console.log('t.screenshot', t.screenshot);
        return <Image key={t['_id']} style={{width:50, height: 50}} source={{uri: t.screenshot}} />
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