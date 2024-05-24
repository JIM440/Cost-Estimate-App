import { TextInput } from 'react-native';
import React from 'react';
// styles
import { inputStyles } from '../styles/components/inputStyles';

const Input = ({ placeholder, onChange }) => {
  return (
    <TextInput
      style={inputStyles.input}
      placeholder={placeholder}
      onChangeText={onChange}
    />
  );
};

export default Input;
