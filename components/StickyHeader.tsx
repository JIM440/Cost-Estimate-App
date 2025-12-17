import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { primary_color, white } from '../styles/colors';

interface StickyHeaderProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  title,
  backgroundColor = primary_color,
  textColor = white,
  style,
  titleStyle,
  leftComponent,
  rightComponent,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor,
          paddingTop: insets.top,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {leftComponent && <View style={styles.left}>{leftComponent}</View>}
        <Text style={[styles.title, { color: textColor }, titleStyle]}>
          {title}
        </Text>
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  left: {
    position: 'absolute',
    left: 16,
  },
  right: {
    position: 'absolute',
    right: 16,
  },
});

export default StickyHeader;

