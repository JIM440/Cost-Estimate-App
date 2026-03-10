import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

export type OnboardingPagerRef = { setPage: (index: number) => void };

type Props = {
  index: number;
  onIndexChange: (index: number) => void;
  children: React.ReactNode[];
  style?: ViewStyle;
};

const OnboardingPager = forwardRef<OnboardingPagerRef, Props>(function OnboardingPager(
  { index, children, style },
  ref
) {
  const safeIndex = Math.max(0, Math.min(index, children.length - 1));
  const current = React.Children.toArray(children)[safeIndex];

  useImperativeHandle(ref, () => ({
    setPage(_i: number) {
      // Parent already controls index; no-op on web.
    },
  }));

  return <View style={[styles.pager, style]}>{current}</View>;
});

const styles = StyleSheet.create({
  pager: { flex: 1 },
});

export default OnboardingPager;
