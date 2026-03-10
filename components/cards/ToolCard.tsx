import React from 'react';
import { Pressable, Text, StyleSheet, StyleProp, ViewStyle, Image, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { wideCardStyles } from '../../styles/components/cards';

export interface ToolCardProps {
  title: string;
  icon?: number | React.ComponentType<any>;
  iconNode?: React.ReactNode;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  icon,
  iconNode,
  onPress,
  containerStyle,
}) => {
  const { colors } = useTheme();
  let iconEl: React.ReactNode = null;
  if (iconNode != null) {
    iconEl = iconNode;
  } else if (icon != null) {
    // Resolve default export (web bundler often wraps in { default })
    const resolved =
      typeof icon === 'object' && icon !== null && 'default' in icon
        ? (icon as { default: unknown }).default
        : icon;

    // Image: number (RN asset) or uri object (web)
    const imageSource =
      typeof resolved === 'number'
        ? resolved
        : resolved &&
          typeof resolved === 'object' &&
          'uri' in (resolved as object)
        ? (resolved as { uri: string })
        : null;
    if (imageSource != null) {
      iconEl = <Image source={imageSource} style={{ width: 60, height: 60 }} />;
    } else if (typeof resolved === 'function') {
      const IconComponent = resolved as React.ComponentType<{ width?: number; height?: number }>;
      iconEl = (
        <View style={{ width: 60, height: 60 }}>
          <IconComponent width={60} height={60} />
        </View>
      );
    }
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        wideCardStyles.wideCardBox,
        {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.borderColor,
        },
        containerStyle,
      ]}
    >
      {iconEl}
      <Text style={[wideCardStyles.title, styles.title, { color: colors.muted_text }]} numberOfLines={2}>
        {typeof title === 'string' ? title : ''}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    // marginTop: 8,
  },
});

export default ToolCard;

