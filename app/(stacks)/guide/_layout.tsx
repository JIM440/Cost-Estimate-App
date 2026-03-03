import { Stack } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';

export default function GuideLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.primary_color,
        headerShown: false,
        headerTransparent: false,
        contentStyle: {
          backgroundColor: colors.screen_background,
        },
      }}
    />
  );
}

