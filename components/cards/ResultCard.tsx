import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface ResultCardProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  style?: ViewStyle;
}

export default function ResultCard({
  label,
  value,
  unit,
  highlight = false,
  style,
}: ResultCardProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card },
        highlight && { borderWidth: 1, borderColor: colors.primary_color },
        style,
      ]}
    >
      <Text style={[styles.label, { color: colors.muted_text }]}>{label}</Text>
      <View style={styles.valueRow}>
        <Text
          style={[
            styles.value,
            { color: colors.heading_text },
            highlight && { color: colors.primary_color },
          ]}
        >
          {value}
        </Text>
        {unit ? <Text style={[styles.unit, { color: colors.muted_text }]}>{unit}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
  unit: {
    marginLeft: 6,
    fontSize: 13,
  },
});


