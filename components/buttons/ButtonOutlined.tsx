import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { buttonStyles } from '../../styles/components/buttonStyles';

type ButtonOutlinedProps = {
  onPress?: () => void;
  title?: string;
  leftIcon?: React.ReactNode;
  showChevronLeft?: boolean;
};

const ButtonOutlined = ({ onPress, title, leftIcon, showChevronLeft = true }: ButtonOutlinedProps) => {
  const { colors } = useTheme();
  const icon = leftIcon ?? (showChevronLeft ? <Feather name="chevron-left" size={18} color={colors.heading_text} /> : null);
  return (
    <TouchableOpacity style={buttonStyles.btn_outline} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        {icon}
        <Text style={[buttonStyles.btn_outlined_text, { color: colors.heading_text }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonOutlined;


