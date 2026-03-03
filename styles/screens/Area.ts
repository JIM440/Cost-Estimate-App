import { StyleSheet } from 'react-native';

const Area = StyleSheet.create({
  img: {
    width: '100%',
    objectFit: 'contain',
    minHeight: 140,
    borderRadius: 12,
  },
  imgContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
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
