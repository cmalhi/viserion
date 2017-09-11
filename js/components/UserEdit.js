import React from 'react';
import { Animated, Dimensions, Image, Text, TouchableOpacity, View, WebView, Button, StyleSheet, TextInput } from 'react-native';
const io = require('socket.io-client');
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

    socket.on('launchListModal', (data) => {
      this.setState({ listModal: true, listData: data });
    });
  }

  handleRearrange() {
    this.setState({ orderModal: true });
  }

  handleAdd() {
    this.setState({ addPageModal: true });
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        {/*<WebView style={styles.webView} source={{uri: `${global.HOST}/pages/templates/reactify.html`}} />*/}
        <WebView style={styles.webView} source={{uri: `${global.HOST}/webpages/add.html`}} />
        {this.state.shortTextModal ? <ShortTextModal data={this.state.shortTextData} id={this.state.shortTextId} title={this.state.shortTextValue} closeModal={() => this.setState({shortTextModal: false}) } /> : null}
        {this.state.longTextModal ? <LongTextModal data={this.state.longTextData} id={this.state.longTextId} body={this.state.longTextValue} closeModal={() => this.setState({longTextModal: false}) } /> : null}
        {this.state.imageModal ? <ImageModal data={this.state.imageData} id={this.state.imageId} closeModal={() => this.setState({imageModal: false})} /> : null}
        {this.state.colorModal ? <ColorModal data={this.state.colorData} navigation={this.props.navigation} closeModal={() => this.setState({colorModal: false})} /> : null}
        {this.state.orderModal ? <OrderModal closeModal={() => this.setState({orderModal: false})} openAddModal={(() => this.setState({addPageModal: true}))} /> : null}
        {this.state.addPageModal ? <AddPageModal closeModal={() => this.setState({addPageModal: false})} /> : null}
        {this.state.imageModal ? <ImageModal data={this.state.listData} id={this.state.imageId} closeModal={() => this.setState({imageModal: false})} /> : null}
        {this.state.pricingListModal ? <PricingListModal details={this.state.pricingDetails} Id={this.state.pricingListId} closeModal={() =>this.setState({pricingListModal: false})} /> : null }  
        <Button title="Add New Component" onPress={this.handleAdd} />
        <Button title="Rearrange Components" onPress={this.handleRearrange} />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  form: {
    padding: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  flexContainer: {
    flex: 1,
  },
  webView: {
    padding: 10,
    width: '100%',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.3)',
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

function mapStateToProps({ order }) {
  return { order };
}

export default connect(mapStateToProps, null)(UserEdit);
