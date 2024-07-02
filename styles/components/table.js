// styles.js

import { StyleSheet } from 'react-native';

const tableStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderBottomColor: '#000',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
  },
  column: {
    flex: 1,
    padding: 6,
  },
  columnHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  columnHeaderSingle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    padding: 10,
    fontSize: 18,
  },
  cell: {
    textAlign: 'center',
  },
});

export default tableStyles;
