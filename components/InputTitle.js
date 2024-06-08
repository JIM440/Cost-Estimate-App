import { View, Text, TextInput } from 'react-native';
import React from 'react';
// styles
import { inputStyles } from '../styles/components/inputStyles';

const TextInputTitle = ({ title, placeholder, onChange, value, style }) => {
  return (
    <View style={style ? style : inputStyles.container}>
      <Text style={inputStyles.title}>{title}:</Text>
      <TextInput
        style={inputStyles.input}
        placeholder={placeholder}
        inputMode="numeric"
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

export default TextInputTitle;
