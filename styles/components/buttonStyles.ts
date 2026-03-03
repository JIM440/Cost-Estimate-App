import { StyleSheet } from 'react-native';
import { primary_color, borderColor } from '../colors';
import { border_radius_8 } from '../global';

export const buttonStyles = StyleSheet.create({
  btn_primary: {
    borderRadius: border_radius_8,
    padding: 10,
    backgroundColor: primary_color,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    maxHeight: 45,
    minHeight: 45,
    marginTop: 10,
  },
  btn_primary_text: {
    color: '#fff',
    fontSize: 16,
  },
  btn_outline: {
    borderRadius: border_radius_8,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: borderColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  btn_outlined_text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
