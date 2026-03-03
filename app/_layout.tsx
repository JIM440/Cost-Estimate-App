import React, { useEffect } from 'react';
import { Stack, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ProjectsProvider } from '../context/ProjectsContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LocaleProvider, useLocale } from '../context/LocaleContext';

const SPLASH_MIN_DURATION_MS = 2000;

(global as any).__splashStart = Date.now();
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { colors, theme, setTheme, isDark, loading: themeLoading } = useTheme();
  const { loading: localeLoading } = useLocale();

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
          <RootLayoutContent />
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
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={styles.drawerOverlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      <View style={[styles.drawer, { backgroundColor: colors.card }]}>
        <View style={styles.drawerHeader}>
          <View style={styles.drawerLogo}>
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
          label="Home"
          secondaryLabel="Accueil"
          icon="home"
          onPress={onClose}
          colors={colors}
        />

        <Pressable style={styles.drawerItem} onPress={toggleTheme}>
          <View style={styles.drawerItemRow}>
            <Feather name={isDark ? 'sun' : 'moon'} size={18} color={colors.heading_text} />
            <View style={styles.drawerItemTextBlock}>
              <Text style={[styles.drawerItemText, { color: colors.heading_text }]}>
                {isDark ? 'Light mode' : 'Dark mode'}
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.drawerSectionDivider} />

        <DrawerLink
          href="/settings"
          label="Settings"
          secondaryLabel="Paramètres"
          icon="settings"
          onPress={onClose}
          colors={colors}
        />
        <DrawerLink
          href="/support"
          label="Support / Help"
          secondaryLabel="Support / Aide"
          icon="help-circle"
          onPress={onClose}
          colors={colors}
        />
        <DrawerLink
          href="/about"
          label="About Us"
          secondaryLabel="À propos"
          icon="info"
          onPress={onClose}
          colors={colors}
        />

        <View style={styles.drawerSectionDivider} />

        <DrawerLink
          href="/share"
          label="Share App"
          secondaryLabel="Partager l’application"
          icon="share-2"
          onPress={onClose}
          colors={colors}
        />
        <DrawerLink
          href="/rate"
          label="Rate App"
          secondaryLabel="Noter l’application"
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
    backgroundColor: '#0D6B7A',
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
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
});


