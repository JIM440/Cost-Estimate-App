import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { primary_color, white } from '../styles/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerTitle: 'Cost Estimate',
            headerStyle: {
              backgroundColor: primary_color,
            },
            headerTintColor: white,
            headerShown: true,
            contentStyle: {
              backgroundColor: white,
            },
          }}
        >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="share" options={{ title: 'Share App' }} />
        <Stack.Screen name="rate" options={{ title: 'Rate App' }} />
        <Stack.Screen name="single-storey" options={{ title: 'Single Storey' }} />
        <Stack.Screen name="multi-storey" options={{ title: 'Multi Storey' }} />
        <Stack.Screen name="guide" options={{ headerShown: false }} />
        <Stack.Screen name="block" />
        <Stack.Screen name="concrete" />
        <Stack.Screen name="excavation" />
        <Stack.Screen name="filling" />
        <Stack.Screen name="formwork" />
        <Stack.Screen name="foundation" />
        <Stack.Screen name="hollowslab" options={{ title: 'Hollow Block Slab' }} />
        <Stack.Screen name="paint" />
        <Stack.Screen name="plaster" />
        <Stack.Screen name="rcslab" options={{ title: 'RC Slab' }} />
        <Stack.Screen name="rods" />
        <Stack.Screen name="roofing" />
        <Stack.Screen name="tiles" />
        <Stack.Screen name="circle" />
        <Stack.Screen name="square" />
        <Stack.Screen name="triangle" />
        <Stack.Screen name="rectangle" />
        <Stack.Screen name="trapezium" />
        <Stack.Screen name="ellipse" />
        <Stack.Screen name="length" />
        <Stack.Screen name="conversion-area" options={{ title: 'Area Conversion' }} />
        <Stack.Screen name="volume" />
        <Stack.Screen name="weight" />
        <Stack.Screen name="temperature" />
        <Stack.Screen name="pressure" />
        <Stack.Screen name="angle" />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

