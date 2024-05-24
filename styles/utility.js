import { StyleSheet } from 'react-native';
import { white } from './colors';

const titleStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
});

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 20,
  },
  resultContainer: {
    width: '80%',
  },
});

export { titleStyles, containerStyles };
