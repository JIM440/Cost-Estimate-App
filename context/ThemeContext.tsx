import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors } from '../styles/colors';

const THEME_KEY = '@cost_estimate_theme';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary_color: string;
  light_bg_blue: string;
  white: string;
  borderColor: string;
  accent_orange: string;
  success_green: string;
  error_red: string;
  muted_text: string;
  heading_text: string;
  screen_background: string;
  card: string;
  tabBarBg: string;
  tabBarBorder: string;
}

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  colors: ThemeColors;
  isDark: boolean;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setThemeState(saved);
        } else {
          setThemeState('system');
        }
      } catch (_) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    AsyncStorage.setItem(THEME_KEY, mode).catch(() => {});
  };
  const effectiveMode = theme === 'system'
    ? systemScheme === 'dark'
      ? 'dark'
      : 'light'
    : theme;

  const colors = effectiveMode === 'dark' ? darkColors : lightColors;

  const value: ThemeContextValue = {
    theme,
    setTheme,
    colors,
    isDark: effectiveMode === 'dark',
    loading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
