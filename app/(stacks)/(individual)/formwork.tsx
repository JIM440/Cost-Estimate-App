import React from 'react';
import { View } from 'react-native';
import StackHeader from '../../../components/StackHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Screen from '../../../screens/home/individualEstimates/costEstimate/Formwork';
import { useTheme } from '../../../context/ThemeContext';

export default function FormworkEstimateScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader titleKey="items.formwork" />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <Screen />
      </ScreenWrapper>
    </View>
  );
}

