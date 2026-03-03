import React, { useState, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import StackHeader from '../../../components/StackHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Screen from '../../../screens/home/houseCategory/Multi/MultiHouse';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';

export default function FourStoreyScreen() {
  const params = useLocalSearchParams<{ projectId?: string }>();
  const { colors } = useTheme();
  const [onSave, setOnSave] = useState<(() => Promise<void>) | null>(null);

  const handleSavePress = useCallback(async () => {
    if (onSave) await onSave();
  }, [onSave]);

  const rightElement = (
    <Pressable onPress={handleSavePress} hitSlop={10} style={{ padding: 4 }}>
      <Feather name="save" size={22} color={colors.white} />
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader titleKey="home.four.title" rightElement={rightElement} />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <Screen floors={4} projectId={params.projectId} onRegisterSave={setOnSave} />
      </ScreenWrapper>
    </View>
  );
}
