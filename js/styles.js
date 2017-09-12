import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 22,
  },
  header: {
    marginBottom: 20,
  },
  bottomButton: {
    backgroundColor: '#ff7043',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
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
  basicContainer: {
    flex: 1,
  },

  // Buttons
  absoluteRight: {
    position: 'absolute',
    right: 0,
    top: 50,
  }
});