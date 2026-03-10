// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Platform, StyleSheet, Pressable, Text, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLocale } from '../../context/LocaleContext';
import { useRouter } from 'expo-router';
import { useWalkthrough } from '../../context/WalkthroughContext';

export default function TabsLayout() {
  const { colors } = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  const { status, currentStep, setStep, skip, complete } = useWalkthrough();

  const isWalkthroughActive = status === 'in_progress' && currentStep != null;

  const content = useMemo(() => {
    if (!isWalkthroughActive || currentStep == null) return null;

    if (currentStep === 'home-house') {
      return {
        title: t('walkthrough.home.house.title'),
        body: t('walkthrough.home.house.body'),
        primaryLabel: t('walkthrough.next'),
        onPrimary: () => setStep('home-individual'),
      };
    }
    if (currentStep === 'home-individual') {
      return {
        title: t('walkthrough.home.individual.title'),
        body: t('walkthrough.home.individual.body'),
        primaryLabel: t('walkthrough.next'),
        onPrimary: () => {
          setStep('guides');
          router.push('/guides');
        },
      };
    }
    if (currentStep === 'guides') {
      return {
        title: t('walkthrough.guides.title'),
        body: t('walkthrough.guides.body'),
        primaryLabel: t('walkthrough.next'),
        onPrimary: () => {
          setStep('settings');
          router.push('/settings');
        },
      };
    }

    return {
      title: t('walkthrough.settings.title'),
      body: t('walkthrough.settings.body'),
      primaryLabel: t('walkthrough.done'),
      onPrimary: () => {
        complete();
      },
    };
  }, [complete, currentStep, isWalkthroughActive, router, setStep, t]);

  return (
    <View style={{ flex: 1 }}>
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

      {isWalkthroughActive && content != null ? (
        <View style={stylesOverlay.overlay} pointerEvents="auto">
          {/* Block all taps above the tab bar (no dismiss on backdrop press) */}
          <Pressable
            style={stylesOverlay.backdrop}
            onPress={() => {}}
          />
          <View
            style={[
              stylesOverlay.sheet,
              { backgroundColor: colors.screen_background },
            ]}
          >
            <Text style={[stylesOverlay.title, { color: colors.heading_text }]}>
              {content.title}
            </Text>
            <Text style={[stylesOverlay.body, { color: colors.muted_text }]}>
              {content.body}
            </Text>

            <View style={stylesOverlay.row}>
              <Pressable onPress={skip} hitSlop={10}>
                <Text style={[stylesOverlay.skip, { color: colors.muted_text }]}>
                  {t('walkthrough.skip')}
                </Text>
              </Pressable>

              <Pressable
                onPress={content.onPrimary}
                style={[stylesOverlay.primaryBtn, { backgroundColor: colors.primary_color }]}
              >
                <Text style={[stylesOverlay.primaryText, { color: colors.white }]}>
                  {content.primaryLabel}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const stylesOverlay = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 50,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: Platform.OS === 'ios' ? 80 : 68, // leave tab bar visible
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'ios' ? 88 : 76,
    borderRadius: 14,
    padding: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  body: {
    fontSize: 13,
    lineHeight: 18,
  },
  row: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skip: {
    fontSize: 13,
    fontWeight: '600',
  },
  primaryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: '700',
  },
});