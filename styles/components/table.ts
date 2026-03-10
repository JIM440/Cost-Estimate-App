import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../context/ThemeContext';
import { estimate_section_spacing } from '../global';

export function createTableStyles(
  colors: Pick<ThemeColors, 'borderColor' | 'heading_text'>
) {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      borderWidth: 1,
      borderBottomWidth: 0,
      borderColor: colors.borderColor,
      borderBottomColor: colors.borderColor,
      marginBottom: estimate_section_spacing,
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
      paddingVertical: 5,
    },
    column: {
      flex: 1,
      padding: 6,
    },
    columnHeader: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.heading_text,
    },
    columnHeaderLeft: {
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: 16,
      color: colors.heading_text,
    },
    columnHeaderRight: {
      fontWeight: 'bold',
      textAlign: 'right',
      color: colors.heading_text,
    },
    columnSubHeader: {
      fontWeight: '700',
      marginLeft: 22,
      textAlign: 'left',
      paddingVertical: 10,
      color: colors.heading_text,
    },
    columnHeaderSingle: {
      fontWeight: 'bold',
      textAlign: 'center',
      alignSelf: 'center',
      width: '100%',
      padding: 10,
      fontSize: 18,
      color: colors.heading_text,
    },
    cell: {
      textAlign: 'center',
      color: colors.heading_text,
    },
    cellLeft: {
      textAlign: 'left',
      marginLeft: 16,
      color: colors.heading_text,
    },
  });
}

// Default export for backward compatibility - uses neutral gray (callers should prefer createTableStyles)
const defaultTableStyles = createTableStyles({
  borderColor: '#E2E8F0',
  heading_text: '#0F172A',
});
export default defaultTableStyles;
