import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableHighlight, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput, AsyncStorage } from 'react-native';
import ImageModal from './modals/ImageModal';
import ShortTextModal from './modals/ShortTextModal';
import LongTextModal from './modals/LongTextModal';
import ColorModal from './modals/ColorModal';
import OrderModal from './modals/OrderModal';
import AddComponentModal from './modals/AddComponentModal';
import PricingListModal from './modals/PricingListModal';
import ListModal from './modals/ListModal';
import ShareModal from './modals/ShareModal';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';
import { connect } from 'react-redux';
import { assignUser } from '../actions/index';
import { updateSite } from '../actions/siteActions';
import styles from '../styles'
import { Ionicons } from '@expo/vector-icons';
const io = require('socket.io-client');

var {
  height: deviceHeight
} = Dimensions.get('window');

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareModal: false,
      shortTextModal: false,
      imageModal: false,
      colorModal: false,
      pricingListModal: false,
      orderModal: false,
      addPageModal: false,
      listModal: false,
      addComponentModal: false,
      
      imageId: null,
      shortTextId: null,
      longTextId: null,
      pricingListId: '',
      listId: '',

      order: [],
      html: '',
      componentOrder: '',
      shortTextValue: '',
      longTextValue: '',
      pricingDetails: [],

      shortTextData: null,
      colorData: null,
      longTextData: null,
      imageData: null,
      listData: null,
    };
    this.handleRearrange = this.handleRearrange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({order: this.props.order}, ()=>{
      console.log('component did mount user edit', this.props.order)
    });

    const socket = io(global.HOST, { transports: ['websocket'] });

      socket.on('launchTitleModal', (data) => {
        if (data.room === this.props.siteId) {
          this.setState({ shortTextModal: true, shortTextId: data.key, shortTextValue: data.textValue, shortTextData: data });
        }
      });

    socket.on('launchLongTextModal', (data) => {
      if (data.room === this.props.siteId) {
        this.setState({ longTextModal: true, longTextId: data.key, longTextValue: data.textValue, longTextData: data });
      }
    });

    socket.on('launchImageModal', (data) => {
      if (data.room === this.props.siteId) {
        this.setState({ imageModal: true, imageId: data.id, imageData: data });
      }
    });

    socket.on('colorChange', (data) => {
      // data : { id: x, path: y }
      if (data.room === this.props.siteId) {
        this.setState({ colorModal: true, colorData: data });
      }
    });

    socket.on('launchPricingModal2', (list) => {
      if (data.room === this.props.siteId) {
        this.setState({ pricingListModal: true, pricingDetails: list.details, pricingListId: list.key });
      }
    });

    socket.on('launchListModal2', (data) => {
      // TODO: get id
      if (data.room === this.props.siteId) {
        this.setState({ listModal: true, listData: data, listId: data.key });
      }
    });

    socket.on('getPrefsUserEdit', (message) => {
      socket.emit('sendPrefsFromUserEdit', this.props.preferences);
    });
  }

  handleRearrange() {
    this.setState({ orderModal: true });
    this.setState({ addComponentModal: false });
  }

  handleAdd() {
    this.setState({ addComponentModal: true });
    this.setState({ orderModal: false });
  }
  
  handleSubmit() {
    const { navigate } = this.props.navigation;
    this.props.updateSite();
    AsyncStorage.getItem('userId')
      .then((userId) => {
        if (userId) {
          this.props.assignUser();
          navigate('MainApp');
        } else {
          console.log('false');
          navigate('LoginSignUpSplash', { rootNavigate:navigate });
        }
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.basicContainer}>
        <View style={styles.basicContainer}>
          {/*<WebView style={styles.screenWidth} source={{uri: `${global.HOST}/webpages/add.html`}} />*/}
          <WebView style={styles.screenWidth} source={{uri: `${global.HOST}/id/${this.props.siteId}`}} />
          { this.state.shortTextModal ?
            <ShortTextModal
              data={this.state.shortTextData}
              id={this.state.shortTextId}
              title={this.state.shortTextValue}
              closeModal={() => this.setState({shortTextModal: false}) }
            /> : null }
          { this.state.longTextModal ?
            <LongTextModal
              data={this.state.longTextData}
              id={this.state.longTextId}
              body={this.state.longTextValue}
              closeModal={() => this.setState({longTextModal: false}) }
            /> : null }
          { this.state.imageModal ?
            <ImageModal
              data={this.state.imageData}
              id={this.state.imageId}
              closeModal={() => this.setState({imageModal: false})}
            /> : null }
          {this.state.colorModal ?
            <ColorModal
              data={this.state.colorData}
              navigation={this.props.navigation}
              closeModal={() => this.setState({colorModal: false})}
            /> : null }
          { this.state.orderModal ?
            <OrderModal
              closeModal={() => this.setState({orderModal: false})}
              openAddModal={(() => this.setState({addComponentModal: true}))}
            /> : null }
          { this.state.addComponentModal ?
            <AddComponentModal
              closeModal={() => this.setState({addComponentModal: false})}
            /> : null }
          { this.state.listModal ?
            <ListModal
              data={this.state.listData}
              closeModal={() => this.setState({listModal: false})}
            /> : null }
          { this.state.pricingListModal ?
            <PricingListModal
              details={this.state.pricingDetails}
              Id={this.state.pricingListId}
              closeModal={() => this.setState({pricingListModal: false})}
            /> : null }
          { this.state.shareModal ?
            <ShareModal
              closeModal={() => this.setState({shareModal: false})}
            /> : null }

        </View>
        <View style={styles.absoluteBottom}>
          <TouchableHighlight
            style={ [styles.buttonCentered, styles.continueButton] }
            underlayColor='#1D59BF'
            onPress={this.handleSubmit}
          >
            <Text style={ [styles.buttonText, { color: '#eee', }] }>Save</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.absoluteRight} >
          <TouchableHighlight
            style={[styles.sideButton, styles.buttonCentered]}
            underlayColor='#3D6DF9'
            onPress={this.handleAdd}
          >
            <Ionicons name="md-add" color="#fff" size={32} />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.sideButton, styles.buttonCentered]}
            underlayColor='#3D6DF9'
            onPress={this.handleRearrange}
          >
            <Ionicons name="md-reorder" color="#fff" size={32} />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.sideButton, styles.buttonCentered]}
            underlayColor='#3D6DF9'
            onPress={() => { this.setState({shareModal: true}) }}
          >
            <Ionicons name="ios-share-outline" color="#fff" size={32} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ order, siteId, preferences }) {
  return { order, siteId, preferences };
}

export default connect(mapStateToProps, { updateSite, assignUser })(UserEdit);
