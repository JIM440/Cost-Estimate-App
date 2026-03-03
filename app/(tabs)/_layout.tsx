// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';

export default function TabsLayout() {
  const { colors } = useTheme();
  const { t } = useLocale();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary_color,
        tabBarInactiveTintColor: colors.muted_text,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          height: Platform.OS === 'ios' ? 80 : 68,
        },
        tabBarLabelStyle: {
          marginTop: 2,
        },
        tabBarItemStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: t('tab.home'),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 28,
                borderRadius: 999,
                backgroundColor: focused ? `${colors.primary_color}2A` : 'transparent',
                overflow: 'hidden',
              }}
            >
              <Feather
                name="home"
                color={focused ? colors.primary_color : color}
                size={20}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="projects"
        options={{
          title: t('tab.projects'),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 28,
                borderRadius: 999,
                backgroundColor: focused ? `${colors.primary_color}2A` : 'transparent',
                overflow: 'hidden',
              }}
            >
              <Feather
                name="folder"
                color={focused ? colors.primary_color : color}
                size={20}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="tools"
        options={{
          title: t('tab.tools'),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 28,
                borderRadius: 999,
                backgroundColor: focused ? `${colors.primary_color}2A` : 'transparent',
                overflow: 'hidden',
              }}
            >
              <Feather
                name="tool"
                color={focused ? colors.primary_color : color}
                size={20}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="guides"
        options={{
          title: t('tab.guides'),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 28,
                borderRadius: 999,
                backgroundColor: focused ? `${colors.primary_color}2A` : 'transparent',
                overflow: 'hidden',
              }}
            >
              <Feather
                name="book"
                color={focused ? colors.primary_color : color}
                size={20}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="settings/index"
        options={{
          title: t('tab.settings'),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 28,
                borderRadius: 999,
                backgroundColor: focused ? `${colors.primary_color}2A` : 'transparent',
                overflow: 'hidden',
              }}
            >
              <Feather
                name="settings"
                color={focused ? colors.primary_color : color}
                size={20}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}