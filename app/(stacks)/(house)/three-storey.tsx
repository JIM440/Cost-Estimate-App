import React, { useRef } from 'react';
import { View, Pressable, Alert } from 'react-native';
import StackHeader from '../../../components/StackHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Screen from '../../../screens/home/houseCategory/Multi/MultiHouse';
import { useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';

export default function ThreeStoreyScreen() {
  const params = useLocalSearchParams<{ projectId?: string }>();
  const { colors } = useTheme();
  const saveHandlerRef = useRef<(() => Promise<void>) | null>(null);

  const handleSavePress = async () => {
    if (!saveHandlerRef.current) {
      Alert.alert('Save is not ready yet.');
      return;
    }
    try {
      await saveHandlerRef.current();
    } catch (e) {
      Alert.alert('Failed to save project.');
    }
  };

  const rightElement = (
    <Pressable onPress={handleSavePress} hitSlop={10} style={{ padding: 4 }}>
      <Feather name="save" size={22} color={colors.white} />
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader titleKey="home.three.title" rightElement={rightElement} />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <Screen floors={3} projectId={params.projectId} saveHandlerRef={saveHandlerRef} />
      </ScreenWrapper>
    </View>
  );
}

