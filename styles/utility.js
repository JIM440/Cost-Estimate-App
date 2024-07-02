import { StyleSheet, View } from 'react-native';
import { white } from './colors';

const Line = () => {
  return <View style={hr.line}></View>;
};

const titleStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'semibold',
    marginBottom: 10,
  },
  boldTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

const containerStyles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultContainer: {
    width: '80%',
  },
});

const hr = StyleSheet.create({
  line: {
    height: 1.5,
    width: '100%',
    marginVertical: 20,
    backgroundColor: 'rgb(179 179 179)',
  },
});

export { titleStyles, containerStyles, Line };
