import React from 'react';
import { View } from 'react-native';
import StackHeader from '../../../components/StackHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Screen from '../../../screens/guide/Foundation';
import { useTheme } from '../../../context/ThemeContext';

export default function FoundationGuideScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader titleKey="guide.foundation.title" />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <Screen />
      </ScreenWrapper>
    </View>
  );
}

