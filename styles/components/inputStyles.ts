import { StyleSheet } from 'react-native';
import { border_radius_8 } from '../global';

export const inputStyles = StyleSheet.create({
  container: {},
  twoColumn: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
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
    backgroundColor: 'transparent',
  },
  threeColumn: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  threeColumnInput: {
    marginRight: 10,
    width: '30%',
    borderColor: 'gray',
  },
  twoColumnInput: {
    flexGrow: 1,
    flexBasis: '47%',
    maxWidth: '47%',
    borderColor: 'gray',
  },
  oneColumnInput: {
    width: '30%',
    minWidth: 120,
    borderColor: 'gray',
  },
});
