import { StyleSheet } from 'react-native';
import { border_radius_8 } from '../global';

export const inputStyles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: border_radius_8,
    padding: 10,
    borderColor: 'gray',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 250,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: 'gray',
  },
  threeColumn: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  threeColumnInput: {
    marginRight: 10,
    width: '32%',
    borderColor: 'gray',
  },
});
