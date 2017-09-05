import React from 'react';
import { Text, TouchableHighlight, Image } from 'react-native';

export default class AddPageModalEntry extends React.Component {
  render() {
    return (
      <Text style={styles.bigText}>Pricing</Text>
      <Image
        style={{width: 194, height: 120}}
        source={require('../../../images/components/pricing.png')}
      />
    );
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  webView: {
    padding: 10,
    width: '100%',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
  },
  innerModal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    position: 'relative',
    top: '5%',
    borderRadius: 10,
  },
  bigText: {
    fontSize: 20,
  },
});