import React from 'react';
import { Animated, Button, Image, Text, TouchableOpacity, View, ScrollView, WebView, Dimensions, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appendPrefs } from '../../actions/index';
import componentMap from '../../componentMap';
const io = require('socket.io-client');

const tempURL = require('../../../images/components/text_image.png');

var {
  height: deviceHeight
} = Dimensions.get('window');

class AddPageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(deviceHeight),
      compList: [],
      sendCurrentAsync: {components: []},
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleEntryToggle = this.handleEntryToggle.bind(this);
    this.componentListMap = this.componentListMap.bind(this);
    this.mapEach = this.mapEach.bind(this);
  }

  componentWillMount() {
    this.mapEach();
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0,
    }).start();
    console.log('COMPONENT MAPPPPP', componentMap.hero);
    console.log('PREFERENCES PROPPPP', ...this.props.preferences)
  }

  mapEach() {
    var result = [];
    for (var key in componentMap) {
      let mapped = this.componentListMap(componentMap[key].componentName);
      //push the image url in here too
      result.push({ attr: componentMap[key], displayName: mapped, img: tempURL });
    }
    this.setState({compList: result})
  }

  componentListMap(name) {
    // map to look like this
      // {
      //   name: 'NAME',
      //   pic: 'URL',
      // }

      //add image urls in here
      const components = {
        hero: {
          listName: 'Hero',
        },
        imageContent: {
          listName: 'Image Content',
        },
        pinterestContent: {
          listName: 'PinterestContent',
        },
        imageCaption: {
          listName: 'Image Caption',
        },
        textContent: {
          listName: 'Text Content',
        },
        footer: {
          listName: 'Footer',
        },
      };
      if (components[name]){
        return components[name].listName;
      }
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: deviceHeight
    }).start(this.props.closeModal);
  }

  handleEntryToggle(attr) {
    console.log('you clicked on', attr);
    // Close modal
    this.closeModal()
    // Populate Webview with 'name' component
    const socket = io(global.HOST, { transports: ['websocket'] });
    // Emit to a socket with 'name'
      this.props.appendPrefs(attr);
      console.log("The PREFERENCES OBJ", {components: [...this.props.preferences]}, "The SAMPLE DATA OBJ", sampleData)
      this.setState({sendCurrentAsync: {components: [...this.props.preferences]}}, () => {
        socket.emit('newPref', this.state.sendCurrentAsync);
      })

    // TODO: Update sitePreferences object
  }

  render() {
    return (
      <Animated.View
        style={[styles.modal, {transform: [{translateY: this.state.offset}]}]}>
        <View style={styles.innerModal}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.center}>Close Menu</Text>
          </TouchableOpacity>
          <ScrollView>
            {this.state.compList.map((comp, index) =>        
              <View key={index}>
                <Text
                  onPress={this.handleEntryToggle.bind(this, comp.attr)}
                  style={styles.bigText}>{comp.displayName}</Text>
                <TouchableOpacity
                  onPress={this.handleEntryToggle.bind(this, comp.attr)}
                >
                  <Image
                   style={{width: 194, height: 120}}
                   source={comp.img}
                  />
                </TouchableOpacity>  
              </View> )
            }
          </ScrollView>
        </View>
      </Animated.View>
    )
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
    selected: {
    opacity: 0.5,
    backgroundColor: '#FFF',
  },
});

function mapStateToProps({ toggleOrder, preferences }) {
  return { toggleOrder, preferences };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({appendPrefs}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(AddPageModal);

var sampleData = {
        components: [
        {
          name: 'My Hero',
          componentName: 'hero',
          attr: {
            bgColor: 'defaultColor',
            title: 'defaultTitle',
          },
        },
        {
          name: 'My ImageContent',
          componentName: 'imageContent',
          attr: {
            imageUrl: 'http://i.imgur.com/A1SGNax.png',
            mainTitle: 'What\'s on Spotify?',
            subtitle1: 'Music',
            body1: 'There are millions of songs on Spotify. Play your favorites, discover new tracks, and build the perfect collection.',
            subtitle2: 'Playlists',
            body2: 'You’ll find readymade playlists to match your mood, put together by music fans and experts.',
            subtitle3: 'New Releases',
            body3: 'Hear this week’s latest singles and albums, and check out what’s hot in the Top 50.',
          },
        },
        {
          name: 'My PinterestContent',
          componentName: 'pinterestContent',
          attr: {
            headerColor: '#d3654b',
            content: [
              {
                title: 'Who can attend?',
                body: 'All undergraduate, graduate, and high school students are welcome. If you are under 18, we\'ll need a parental consent form.',
              },
              {
                title: 'I don’t have a team. Can I still participate?',
                body: 'Of course! It is not necessary to have a team prior to coming to Hack@Brown.',
              },
              {
                title: 'Will there be a standby line the day-of the event?',
                body: 'Yes, there will be a standby line if accepted attendees do not show up! The line will open when registration starts (9am) and students will be admitted off the standby line after registration ends (10:30am).',
              },
            ],
          },
        },
        ],
      };




// click add/rearrange. done
// click add (+) or swipe from right to left. in progress
  // if add page modal = true then make the order modal false, translate to the left and bring in add component modal from right 
// modal pops in from the right
// click on the one you want to add
// goes back to left modal
// new component is appended to the bottom of the list (above the footer) drag it to the spot that you want
// it should automatically scroll to that spot (might need to change the sortable list view)
// highlight the newly added list entry in the order modal 
// click 


// const prefs = {
//   components: [
//     {
//       name: <Hero1 />,
//       attr: {
//         bgColor: '#eee',
//         title: 'Custom title',
//       }
//     },
//     {
//       name: <TextContent />,
//       attr: {
//         title: 'With All Eyes on the South, the Most Important Art Show in America Is Underway in Pittsburgh',
//         body: 'The exhibition—which features works from the likes of Kerry J. Marshall, Jenny Holzer, Kara Walker, and Lorna Simpson—begins with “A More Perfect Union,” an examination of national identity and symbols.'
//       }
//     },
//     {
//       name: <Footer />,
//       attr: {
//         text: 'I am good foot'
//       }
//     }
//   ]
// }
