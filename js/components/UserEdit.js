import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableHighlight, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
import ImageModal from './modals/ImageModal';
import ShortTextModal from './modals/ShortTextModal';
import LongTextModal from './modals/LongTextModal';
import ColorModal from './modals/ColorModal';
import OrderModal from './modals/OrderModal';
import AddPageModal from './modals/AddComponentModal';
import PricingListModal from './modals/PricingListModal';
import ListModal from './modals/ListModal';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSite } from '../actions/index';
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
      shortTextModal: false,
      shortTextValue: '',
      imageModal: false,
      colorModal: false,
      imageId: null,
      shortTextId: null,
      longTextId: null,
      longTextValue: '',
      pricingListModal: false,
      pricingDetails: [],
      pricingListId: '',
      listId: '',

      order: [],
      html: '',
      componentOrder: '',

      orderModal: false,
      addPageModal: false,
      listModal: false,

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
      this.setState({ shortTextModal: true, shortTextId: data.key, shortTextValue: data.textValue, shortTextData: data, });
    });

    socket.on('launchLongTextModal', (data) => {
      this.setState({ longTextModal: true, longTextId: data.key, longTextValue: data.textValue, longTextData: data });
    });

    socket.on('launchImageModal', (data) => {
      this.setState({ imageModal: true, imageId: data.id, imageData: data });
    });

    socket.on('colorChange', (data) => {
      // data : { id: x, path: y }
      this.setState({ colorModal: true, colorData: data });
    });

    socket.on('launchPricingModal2', (list) => {
      this.setState({ pricingListModal: true, pricingDetails: list.details, pricingListId: list.key });
    });

    socket.on('launchListModal2', (data) => {
      //TODO: get id
      this.setState({ listModal: true, listData: data, listId: data.key});
    });
  }

  handleRearrange() {
    this.setState({ orderModal: true });
  }

  handleAdd() {
    this.setState({ addPageModal: true });
  }

  handleSubmit() {
    this.props.updateSite(this.props.siteId);
  }

  render() {
    return (
      <View style={styles.basicContainer}>
        <View style={styles.basicContainer}>
          {/*<WebView style={styles.webView} source={{uri: `${global.HOST}/pages/templates/reactify.html`}} />*/}
          <WebView style={styles.fullWidth} source={{uri: `${global.HOST}/${this.props.siteId}`}} />
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
              openAddModal={(() => this.setState({addPageModal: true}))}
            /> : null }
          { this.state.addPageModal ?
            <AddPageModal
              closeModal={() => this.setState({addPageModal: false})}
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
              closeModal={() =>this.setState({pricingListModal: false})}
            /> : null }

          <Button title="Save" onPress={this.handleSubmit} />
        </View>
        <View style={styles.absoluteRight} >
          <TouchableHighlight
            style={[styles.sideButton, styles.buttonCentered]}
            underlayColor='#ff7043'
            onPress={this.handleAdd}
          >
            <Ionicons name="md-add" size={32} />
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.sideButton, styles.buttonCentered]}
            underlayColor='#ff7043'
            onPress={this.handleRearrange}
          >
            <Ionicons name="md-reorder" size={32} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps({ order, siteId }) {
  return { order, siteId };
}

export default connect(mapStateToProps, { updateSite })(UserEdit);
