import React, { useRef } from 'react';
import StackHeader from '../../../components/StackHeader';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Screen from '../../../screens/home/houseCategory/Single/SingleHouse';
import { useLocalSearchParams } from 'expo-router';
import { View, Pressable, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLocale } from '../../../context/LocaleContext';

export default function SingleStoreyScreen() {
  const params = useLocalSearchParams<{ projectId?: string }>();
  const { colors } = useTheme();
  const { t } = useLocale();
  const saveHandlerRef = useRef<(() => Promise<void>) | null>(null);

  const handleSavePress = async () => {
    if (!saveHandlerRef.current) {
      Alert.alert(t('house.save.notReady'));
      return;
    }
    try {
      await saveHandlerRef.current();
    } catch (e) {
      Alert.alert(t('house.save.failed'));
    }
  };

  const rightElement = (
    <Pressable onPress={handleSavePress} hitSlop={10} style={{ padding: 4 }}>
      <Feather name="save" size={22} color={colors.white} />
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.screen_background }}>
      <StackHeader titleKey="home.single.title" rightElement={rightElement} />
      <ScreenWrapper style={{ paddingVertical: 16, paddingBottom: 100 }}>
        <Screen projectId={params.projectId} saveHandlerRef={saveHandlerRef} />
      </ScreenWrapper>
    </View>
  );
}

