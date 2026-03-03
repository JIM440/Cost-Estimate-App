import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { border_radius_8, border_radius_full } from '../../styles/global';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

export type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  fullRound?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled,
  variant = 'primary',
  fullRound = false,
  leftIcon,
  rightIcon,
  style,
}) => {
  const { colors } = useTheme();

  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: fullRound ? border_radius_full : border_radius_8,
  };

  let backgroundColor = 'transparent';
  let borderColor: string | undefined;
  let borderWidth = 0;
  let textColor = colors.heading_text;

  switch (variant) {
    case 'primary':
      backgroundColor = colors.primary_color;
      textColor = colors.white;
      break;
    case 'outline':
      borderColor = colors.borderColor;
      borderWidth = 1;
      textColor = colors.heading_text;
      break;
    case 'ghost':
    default:
      backgroundColor = 'transparent';
      textColor = colors.heading_text;
      break;
  }

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        baseStyle,
        { backgroundColor, borderColor, borderWidth, opacity: isDisabled ? 0.7 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary_color}
        />
      ) : (
        <Text style={[styles.label, { color: textColor }]}>{title}</Text>
      )}
      {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;


