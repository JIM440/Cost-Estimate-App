import { TextInput } from 'react-native';
import React from 'react';
import { inputStyles } from '../../styles/components/inputStyles';
import { useTheme } from '@/context/ThemeContext';

type InputProps = {
  placeholder?: string;
  onChange?: (text: string) => void;
};

const Input = ({ placeholder, onChange }: InputProps) => {
  const { colors } = useTheme();
  return (
    <TextInput
      style={{...inputStyles.input, borderColor: colors.borderColor, backgroundColor: colors.card}}
      placeholder={placeholder}
      onChangeText={onChange}
    />
  );
};

export default Input;


