import { View, Text, TextInput, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { inputStyles } from '../../styles/components/inputStyles';
import { useTheme } from '@/context/ThemeContext';

type TextInputTitleProps = {
  title?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
  value?: string;
  style?: StyleProp<ViewStyle>;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel';
};

const TextInputTitle = ({ title, placeholder, onChange, value, style, inputMode = 'numeric' }: TextInputTitleProps) => {
  const { colors } = useTheme();
  return (
    <View style={style ? style : inputStyles.container}>
      <Text style={[inputStyles.title, { color: colors.heading_text }]}>{title}:</Text>
      <TextInput
        style={{...inputStyles.input, borderColor: colors.borderColor, backgroundColor: colors.card, color: colors.muted_text}}
        placeholder={inputMode === 'numeric' ? '0.00' : placeholder}
        placeholderTextColor={colors.muted_text}
        inputMode={inputMode}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

export default TextInputTitle;


