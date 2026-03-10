import React, { useCallback, useEffect } from 'react';
import { Stack, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { AppState, View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ProjectsProvider } from '../context/ProjectsContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LocaleProvider, useLocale } from '../context/LocaleContext';
import { WalkthroughProvider } from '../context/WalkthroughContext';

const SPLASH_MIN_DURATION_MS = 2000;

(global as any).__splashStart = Date.now();
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { colors, theme, setTheme, isDark, loading: themeLoading } = useTheme();
  const { loading: localeLoading } = useLocale();

  const applySystemNavBar = useCallback(async () => {
    if (Platform.OS !== 'android') return;
    if (themeLoading || localeLoading) return;
    try {
      await NavigationBar.setVisibilityAsync('visible');
      await NavigationBar.setBackgroundColorAsync(colors.screen_background);
      await NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
    } catch {
      // ignore - navigation bar API may be unavailable on some devices/contexts
    }
  }, [colors.screen_background, isDark, themeLoading, localeLoading]);

  useEffect(() => {
    if (themeLoading || localeLoading) return;
    const start = (global as any).__splashStart as number | undefined;
    const elapsed = start != null ? Date.now() - start : 0;
    const remaining = Math.max(0, SPLASH_MIN_DURATION_MS - elapsed);
    const t = setTimeout(() => {
      SplashScreen.hideAsync();
    }, remaining);
    return () => clearTimeout(t);
  }, [themeLoading, localeLoading]);

  useEffect(() => {
    applySystemNavBar();
  }, [applySystemNavBar]);

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        applySystemNavBar();
      }
    });
    return () => sub.remove();
  }, [applySystemNavBar]);

  if (themeLoading || localeLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="light" backgroundColor={colors.primary_color} />
          <Stack
            screenOptions={{
              headerTitleAlign: 'left',
              headerStyle: {
                backgroundColor: colors.primary_color,
              },
              headerTintColor: colors.white,
              headerShown: true,
              headerBackTitleStyle: {
                fontSize: 12,
              },
              contentStyle: {
                backgroundColor: colors.screen_background,
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(stacks)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="onboarding"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <ProjectsProvider>
          <WalkthroughProvider>
            <RootLayoutContent />
          </WalkthroughProvider>
        </ProjectsProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}

type AppDrawerProps = {
  onClose: () => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  colors: import('../context/ThemeContext').ThemeColors;
  isDark: boolean;
};

function AppDrawer({ onClose, theme, setTheme, colors, isDark }: AppDrawerProps) {
  const { t } = useLocale();
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={styles.drawerOverlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <View style={[styles.drawer, { backgroundColor: colors.card }]}>
        <View style={styles.drawerHeader}>
          <View style={[styles.drawerLogo, { backgroundColor: colors.primary_color }]}>
            <Text style={[styles.drawerLogoText, { color: colors.white }]}>CE</Text>
          </View>
          <View style={styles.drawerTitleBlock}>
            <Text style={[styles.drawerAppName, { color: colors.heading_text }]}>
              Cost Estimate
            </Text>
            <Text style={[styles.drawerSubtitle, { color: colors.muted_text }]}>
              Full house & materials
            </Text>
          </View>
          <Pressable hitSlop={8} onPress={onClose}>
            <Feather name="x" size={20} color={colors.heading_text} />
          </Pressable>
        </View>

        <DrawerLink
          href="/"
          label={t('drawer.home')}
          secondaryLabel={t('drawer.home')}
          icon="home"
          onPress={onClose}
          colors={colors}
        />

        <Pressable style={styles.drawerItem} onPress={toggleTheme}>
          <View style={styles.drawerItemRow}>
            <Feather name={isDark ? 'sun' : 'moon'} size={18} color={colors.heading_text} />
            <View style={styles.drawerItemTextBlock}>
              <Text style={[styles.drawerItemText, { color: colors.heading_text }]}>
                {isDark ? t('drawer.theme.light') : t('drawer.theme.dark')}
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={[styles.drawerSectionDivider, { backgroundColor: colors.borderColor }]} />

        <DrawerLink
          href="/settings"
          label={t('drawer.settings')}
          secondaryLabel={t('drawer.settings')}
          icon="settings"
          onPress={onClose}
          colors={colors}
        />
        <DrawerLink
          href="/support"
          label={t('drawer.support')}
          secondaryLabel={t('drawer.support')}
          icon="help-circle"
          onPress={onClose}
          colors={colors}
        />
        <DrawerLink
          href="/about"
          label={t('drawer.about')}
          secondaryLabel={t('drawer.about')}
          icon="info"
          onPress={onClose}
          colors={colors}
        />

        <View style={[styles.drawerSectionDivider, { backgroundColor: colors.borderColor }]} />

        <DrawerLink
          href="/share"
          label={t('drawer.share')}
          secondaryLabel={t('drawer.share')}
          icon="share-2"
          onPress={onClose}
          colors={colors}
        />
        <DrawerLink
          href="/rate"
          label={t('drawer.rate')}
          secondaryLabel={t('drawer.rate')}
          icon="star"
          onPress={onClose}
          colors={colors}
        />
      </View>
    </View>
  );
}

type DrawerLinkProps = {
  href: string;
  label: string;
  secondaryLabel?: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  onPress?: () => void;
  colors: import('../context/ThemeContext').ThemeColors;
};

function DrawerLink({ href, label, secondaryLabel, icon, onPress, colors }: DrawerLinkProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.drawerItem} onPress={onPress}>
        <View style={styles.drawerItemRow}>
          <Feather name={icon} size={18} color={colors.heading_text} />
          <View style={styles.drawerItemTextBlock}>
            <Text style={[styles.drawerItemText, { color: colors.heading_text }]}>{label}</Text>
            {secondaryLabel ? (
              <Text style={[styles.drawerItemSecondaryText, { color: colors.muted_text }]}>
                {secondaryLabel}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    zIndex: 100,
    elevation: 5,
  },
  drawer: {
    width: '70%',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  drawerLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  drawerLogoText: {
    fontWeight: '700',
    fontSize: 16,
  },
  drawerTitleBlock: {
    flex: 1,
  },
  drawerAppName: {
    fontSize: 18,
    fontWeight: '700',
  },
  drawerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  drawerItem: {
    paddingVertical: 12,
  },
  drawerItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemTextBlock: {
    marginLeft: 12,
  },
  drawerItemText: {
    fontSize: 16,
  },
  drawerItemSecondaryText: {
    fontSize: 12,
  },
  drawerSectionDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});


