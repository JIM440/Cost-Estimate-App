import { StyleSheet } from 'react-native';

const Area = StyleSheet.create({
  img: {
    width: '100%',
    objectFit: 'contain',
    minHeight: 150,
    marginBottom: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    width: 60,
    borderColor: 'gray',
  },
  resultsText: {
    fontSize: 16,
  },
});

export default Area;
