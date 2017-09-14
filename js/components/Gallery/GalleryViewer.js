import React from 'react';
import {
  Text,
  View,
  WebView,
} from 'react-native';
import { connect } from 'react-redux';
import { removeSite } from '../../actions/siteActions';
import prefToReactify from '../../../app/utils/prefToReactify';
import styles from '../../styles';


class GalleryViewer extends React.Component {
  componentWillUnmount() {
    this.props.removeSite();
  }
  
  render() {
    if (!!this.props.siteId) {
      return(
        <View style={styles.basicContainer}>
          <WebView style={styles.screenWidth} source={{uri: `${global.HOST}/${this.props.siteId}`}} />
        </View>
      );
    } else {
      return (<Text>Loading...</Text>);
    }
  }
}

const mapStateToProps = ({ siteId }) => {
  return { siteId };
};

export default connect(mapStateToProps, { removeSite })(GalleryViewer);