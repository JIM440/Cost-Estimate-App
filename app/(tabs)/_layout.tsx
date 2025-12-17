import { Tabs } from 'expo-router';
import { Image, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primary_color } from '../../styles/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primary_color,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="guides"
        options={{
          title: 'Guides',
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Image
                source={require('../../assets/icons/IconParkSolidBook.png')}
                style={{ width: 24, height: 24 } as ImageStyle}
              />
            ) : (
              <Image
                source={require('../../assets/icons/IconParkOutlineBook.png')}
                style={{ width: 24, height: 24 } as ImageStyle}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="time"
        options={{
          title: 'Time Management',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'time' : 'time-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

