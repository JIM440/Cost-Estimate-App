import React from 'react';
import { View } from 'react-native';
import StackHeader from '../../../components/StackHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Screen from '../../../screens/home/individualEstimates/area/RectangularTank';
import { useTheme } from '../../../context/ThemeContext';

export default function RectangularTankScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader title="Rectangular tank" />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <Screen />
      </ScreenWrapper>
    </View>
  );
}

