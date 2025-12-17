import { Stack } from 'expo-router';
import { primary_color, white } from '../../styles/colors';

export default function GuideLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3A3A3A',
        },
        headerTintColor: white,
        headerShown: true,
        headerTransparent: false,
        headerShadowVisible: true,
        contentStyle: {
          backgroundColor: white,
        },
      }}
    />
  );
}

