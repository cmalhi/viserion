import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, TouchableHighlight, View, WebView, Button, StyleSheet, TextInput, Clipboard, Linking, Share } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePrefs } from '../../actions/index';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles';

var {
  height: deviceHeight
} = Dimensions.get('window');

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      shortName: null,
      urlEnding: null,
    };
    this.siteUrl = `${global.HOST}/${this.props.siteId}`;
    this.closeModal = this.closeModal.bind(this);
    this._setClipboardContent = this._setClipboardContent.bind(this);
    this._handleLinkPress = this._handleLinkPress.bind(this);
    this.share = this.share.bind(this);
    this.changeShortName = this.changeShortName.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start();

    // TODO: Check if this.props.siteId is in the database
    // if so, this.setState({ urlEnding: '' })
  }

  changeShortName() {
    // TODO: Make an axios request to POST /url-shortener
    // this.props.siteId, shortName
  }

  async _setClipboardContent() {
    Clipboard.setString(this.siteUrl);
  }

  _handleLinkPress(link) {
    Linking.openURL(link);
  }

  share() {
    Share.share({
      message: `View my new new site at ${this.siteUrl}`,
      url: this.siteUrl,
      title: 'Come check out my new site'
    })
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal)
  }

  render() {
    return (
      <Animated.View style={[styles.modalBottom, {transform: [{translateY: this.state.offset}]}]}>
        <View style={[styles.innerModalBottom, { paddingVertical: 15, paddingHorizontal: 15 }]}>
          <Text style={[styles.text, {fontSize: 20, fontFamily: 'Avenir-Heavy'}, styles.center]}>
            View your website
          </Text>
          <TouchableOpacity
            onPress={() => this._handleLinkPress(this.siteUrl)}
            style={styles.center}>
            <Text style={[styles.text, {fontSize: 12}]}>{this.siteUrl}</Text>
          </TouchableOpacity>
          {/*<View style={{ flexDirection: 'row', paddingTop: 10, }}>*/}
            {/*<View style={{flex: 2.7}}>*/}
              {/*<TextInput*/}
                {/*onChangeText={(shortName) => this.setState({shortName})}*/}
                {/*style={[styles.text, {height: 40, borderColor: '#617192', borderWidth: 1, paddingHorizontal: 10}]}*/}
                {/*placeholder="Or simplify with a short name"*/}
              {/*/>*/}
            {/*</View>*/}
            {/*<View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>*/}
              {/*<TouchableHighlight*/}
                {/*onPress={() => console.log('make a call to db!')}*/}
                {/*style={{*/}
                  {/*backgroundColor: '#222A3B',*/}
                  {/*borderRadius: 15,*/}
                  {/*width: 100,*/}
                  {/*height: 40,*/}
                {/*}} >*/}
                {/*<Text style={[ styles.text, { padding: 10, color: '#fff', alignSelf: 'center' }]}>Change</Text>*/}
              {/*</TouchableHighlight>*/}
            {/*</View>*/}
          {/*</View>*/}

        </View>
        <View style={[styles.innerModalBottom, {
          flexDirection: 'row',
          justifyContent: 'space-between'
        }] }>
          <TouchableOpacity
            onPress={this._setClipboardContent}
            style={{flex: 1, alignItems: 'center'}}>
            <Ionicons name="ios-copy-outline" size={45} color="rgba(250,250,250,0.7)"/>
            <Text style={[styles.text, styles.iconText]}>Copy link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._handleLinkPress(`sms:1&body=Check%20out%20my%20new%20site%20at%20${this.siteUrl}`)
            }}
            style={{flex: 1, alignItems: 'center'}}>
            <Ionicons name="ios-chatboxes-outline" size={45} color="rgba(250,250,250,0.7)"/>
            <Text style={[styles.text, styles.iconText]}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._handleLinkPress(`mailto:recipient?subject=Check%20out%20my%20new%20website!&body=View%20it%20at%20${this.siteUrl}`)}
            style={{flex: 1, alignItems: 'center'}}>
            <Ionicons name="md-mail" size={45} color="rgba(250,250,250,0.7)"/>
            <Text style={[styles.text, styles.iconText]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ this.share }
            style={{flex: 1, alignItems: 'center'}}>
            <Ionicons name="logo-twitter" size={45} color="rgba(250,250,250,0.7)"/>
            <Text style={[styles.text, styles.iconText]}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ this.share }
            style={{flex: 1, alignItems: 'center'}}>
            <Ionicons name="logo-facebook" size={45} color="rgba(250,250,250,0.7)"/>
            <Text style={[styles.text, styles.iconText]}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          onPress={this.closeModal}
          style={[styles.innerModalBottom, {marginTop: 20, alignItems: 'center'}] }
          underlayColor="rgba(60,72,101,1)"
        >
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Close</Text>
        </TouchableHighlight>
      </Animated.View>
    )
  }
}

function mapStateToProps({ site, siteId }) {
  return { site, siteId };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ updatePrefs }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(ShareModal);

