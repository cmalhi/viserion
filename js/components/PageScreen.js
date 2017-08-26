import React from 'react';
import { Text, View, WebView } from 'react-native';

export default class PageScreen extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View>
        <WebView source={{uri:"http://localhost:8080/pages/templates/simple"}} />
      </View>
    )
  };
}