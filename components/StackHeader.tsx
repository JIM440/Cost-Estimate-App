import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';

type StackHeaderProps =
  | { title: string; titleKey?: never }
  | { titleKey: string; title?: never };

type Props = StackHeaderProps & {
  rightElement?: React.ReactNode;
};

export default function StackHeader(props: Props) {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useLocale();
  const { rightElement } = props;

  const title = 'titleKey' in props ? t(props.titleKey!) : props.title;

  return (
    <View style={[styles.container, { backgroundColor: colors.primary_color }]}>
      <Pressable onPress={() => router.back()} hitSlop={10} style={styles.side}>
        <Feather name="arrow-left" size={22} color={colors.white} />
      </Pressable>

      <Text style={[styles.title, { color: colors.white }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.side}>
        {rightElement}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  side: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

