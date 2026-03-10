import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import PagerView from 'react-native-pager-view';

export type OnboardingPagerRef = { setPage: (index: number) => void };

type Props = {
  index: number;
  onIndexChange: (index: number) => void;
  children: React.ReactNode[];
  style?: ViewStyle;
};

const OnboardingPager = forwardRef<OnboardingPagerRef, Props>(function OnboardingPager(
  { onIndexChange, children, style },
  ref
) {
  const pagerRef = useRef<PagerView>(null);
  useImperativeHandle(ref, () => ({
    setPage(i: number) {
      pagerRef.current?.setPage(i);
    },
  }));
  return (
    <PagerView
      ref={pagerRef}
      style={[styles.pager, style]}
      initialPage={0}
      onPageSelected={(e) => onIndexChange(e.nativeEvent.position)}
    >
      {children}
    </PagerView>
  );
});

const styles = StyleSheet.create({
  pager: { flex: 1 },
});

export default OnboardingPager;
