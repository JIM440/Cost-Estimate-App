import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
// styles
import { buttonStyles } from '../styles/components/buttonStyles';

const ButtonPrimary = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={buttonStyles.btn_primary} onPress={onPress}>
      <Text style={buttonStyles.btn_primary_text}>{title}</Text>
    </TouchableOpacity>
  );
};

// const disabled = StyleSheet.create({
//   disabled: {
//     backgroundColor: '#777',
//   },
// });

export default ButtonPrimary;
