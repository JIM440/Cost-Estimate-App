import type { ThemeColors } from '../context/ThemeContext';

// Single source of truth for light/dark palettes
export const lightColors: ThemeColors = {
  primary_color: '#0D6B7A',
  light_bg_blue: '#F1F5F9',
  white: '#FFFFFF',
  borderColor: '#E2E8F0',
  accent_orange: '#F28C38',
  success_green: '#10B981',
  error_red: '#EF4444',
  muted_text: '#64748B',
  heading_text: '#0F172A',
  // screen_background: '#FFFFFF',
  // card: '#F8FAFC',
  screen_background: '#F8FAFC',
  card: '#FFFFFF',
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#E5E7EB',
};

export const darkColors: ThemeColors = {
  primary_color: '#0D9BAE',
  light_bg_blue: '#1E293B',
  white: '#F1F5F9',
  borderColor: '#334155',
  accent_orange: '#F28C38',
  success_green: '#34D399',
  error_red: '#F87171',
  muted_text: '#94A3B8',
  heading_text: '#F8FAFC',
  // screen_background: '#0F172A',
  // card: '#1E293B',
  // tabBarBg: '#1E293B',
  // tabBarBorder: '#334155',
  screen_background: '#0F141B',
  card: '#17202B',
  tabBarBg: '#141C26',
  tabBarBorder: 'rgba(148, 163, 184, 0.12)',
};

export const themePalettes = {
  light: lightColors,
  dark: darkColors,
};

// Backwards-compatible named exports (default to light palette)
export const primary_color = lightColors.primary_color;
export const light_bg_blue = lightColors.light_bg_blue;
export const white = lightColors.white;
export const borderColor = lightColors.borderColor;
export const accent_orange = lightColors.accent_orange;
export const success_green = lightColors.success_green;
export const error_red = lightColors.error_red;
export const muted_text = lightColors.muted_text;
export const heading_text = lightColors.heading_text;
export const screen_background = lightColors.screen_background;
