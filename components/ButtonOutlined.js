import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
// styles
import { buttonStyles } from '../styles/components/buttonStyles';

const ButtonOutlined = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={buttonStyles.btn_outline} onPress={onPress}>
      <Text style={buttonStyles.btn_outlined_text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonOutlined;
