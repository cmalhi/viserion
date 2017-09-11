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
  }
});