import { View, Text, TextInput } from 'react-native';
import React from 'react';
// styles
import { inputStyles } from '../styles/components/inputStyles';

const TextInputTitle = ({ title, placeholder, onChange, value }) => {
  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.title}>{title}:</Text>
      <TextInput
        style={inputStyles.input}
        placeholder={placeholder}
        keyboardType="numeric"
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

export default TextInputTitle;
