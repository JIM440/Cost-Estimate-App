import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SectionCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function SectionCard({
  title,
  description,
  children,
  style,
}: SectionCardProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.card }, style]}>
      {title && <Text style={[styles.title, { color: colors.heading_text }]}>{title}</Text>}
      {description && <Text style={[styles.description, { color: colors.muted_text }]}>{description}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    marginBottom: 12,
  },
});


