import React from 'react';
import { View } from 'react-native';
import StackHeader from '../../../../components/StackHeader';
import ScreenWrapper from '../../../../components/ScreenWrapper';
import ConcreteScreen from '../../../../screens/home/individualEstimates/costEstimate/Concrete';
import { useTheme } from '../../../../context/ThemeContext';

export default function ConcreteSlabScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader titleKey="estimate.concrete.type.slab" />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <ConcreteScreen initialType="slab" singleTypeMode />
      </ScreenWrapper>
    </View>
  );
}

