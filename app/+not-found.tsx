import { Link, Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';

export default function NotFoundScreen() {
  const { colors } = useTheme();
  const { t } = useLocale();
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={[styles.container, { backgroundColor: colors.screen_background }]}>
        <Text style={[styles.title, { color: colors.heading_text }]}>
          {t('notFound.title')}
        </Text>
        <Link href="/home" style={styles.link}>
          <Text style={[styles.linkText, { color: colors.primary_color }]}>
            {t('notFound.goHome')}
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 16,
  },
});

