import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../context/ThemeContext';

const createGuideStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.screen_background,
    },
    heading: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 16,
      color: colors.heading_text,
    },
    step: {
      fontSize: 16,
      fontWeight: '700',
      marginTop: 16,
      marginBottom: 6,
      color: colors.heading_text,
    },
    text: {
      fontSize: 14,
      marginBottom: 8,
      color: colors.muted_text,
      lineHeight: 20,
    },
    bulletContainer: {
      marginLeft: 16,
      marginBottom: 4,
    },
    bullet: {
      fontSize: 14,
      marginBottom: 4,
      color: colors.heading_text,
    },
    subBullet: {
      fontSize: 13,
      marginLeft: 16,
      marginBottom: 3,
      color: colors.muted_text,
    },
    equation: {
      fontSize: 14,
      marginBottom: 6,
      color: colors.primary_color,
    },
    note: {
      fontSize: 12,
      marginTop: 8,
      marginBottom: 6,
      color: colors.muted_text,
      fontStyle: 'italic',
    },
  });

export default createGuideStyles;
