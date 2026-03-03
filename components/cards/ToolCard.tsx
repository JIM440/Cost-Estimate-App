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
    if (typeof icon === 'number') {
      iconEl = <Image source={icon} style={{ width: 60, height: 60 }} />;
    } else if (typeof icon === 'function') {
      const IconComponent = icon;
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
          shadowColor: colors.borderColor,
          shadowOpacity: 0.04,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 2,
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
    marginTop: 8,
  },
});

export default ToolCard;

