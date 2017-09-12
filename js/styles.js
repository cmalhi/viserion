import { Dimensions, StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 22,
  },
  header: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  headerHeight: {
    flex: 1,
    justifyContent: 'center',
  },
  mainHeight: {
    flex: 6,
  },
  footerHeight: {
    flex: 1,
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#bbb'
  },

  // Keywords
  keyword: {
    backgroundColor: '#2E9D88',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  keywordsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  keywordSelected: {
    opacity: 0.7,
    backgroundColor: '#15433A',
  },
  keywordText: {
    fontSize: 20,
    color: '#fff',
  },

  fullWidth: {
    width: '100%',
  },

  // Modals
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
  form: {
    padding: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },

  // Color Palette
  circleContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  circle: {
    height: (Dimensions.get('window').width / 3) - 20,
    width: (Dimensions.get('window').width / 3) - 20,
    borderRadius: 200,
    margin: 5,
  },

  // Buttons
  absoluteRight: {
    position: 'absolute',
    top: 100,
    right: 0,
  },
  bottomButton: {
    backgroundColor: '#ff7043',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  sideButton: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',

  },
  buttonCentered: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 1,
    paddingTop: 2,
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: "#000000",
  },

  // Grids
  itemsColumn: {
    flexDirection: 'column',
  },
  boxItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#eee',
    margin: 1,
    padding: 10,
  },
});