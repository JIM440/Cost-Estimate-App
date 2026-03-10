import React from 'react';
import { View } from 'react-native';
import StackHeader from '../../../components/StackHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Screen from '../../../screens/guide/RCSlab';
import { useTheme } from '../../../context/ThemeContext';

export default function RCSlabGuideScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader titleKey="guide.rcslab.title" />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <Screen />
      </ScreenWrapper>
    </View>
  );
}

