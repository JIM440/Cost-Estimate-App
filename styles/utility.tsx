import { StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Line = () => {
  const { colors } = useTheme();
  return <View style={{...hr.line, backgroundColor: colors.borderColor}}></View>;
};

const titleStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
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
    flex: 1,
  },
  container: {
    width: '100%',
    flex: 1,
  },
  resultContainer: {
    width: '80%',
  },
});

const hr = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    marginVertical: 20,
  },
});

export { titleStyles, containerStyles, Line };
