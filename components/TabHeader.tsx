import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';

interface TabHeaderProps {
  titleKey: string;
  onLongPress?: () => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ titleKey, onLongPress }) => {
  const { colors } = useTheme();
  const { t } = useLocale();

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary_color,
        },
      ]}
    >
      <Text style={[styles.title, { color: colors.white }]}>{t(titleKey)}</Text>
    </View>
  );

  if (onLongPress) {
    return <Pressable onLongPress={onLongPress}>{content}</Pressable>;
  }
  return content;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TabHeader;

