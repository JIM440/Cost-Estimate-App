import { View, Text } from 'react-native';
import React from 'react';
import { containerStyles } from '../styles/utility';
import ScreenWrapper from '../components/ScreenWrapper';

export default function Settings() {
  return (
    <ScreenWrapper>
      <View style={containerStyles.container}>
        <Text>Settings</Text>
      </View>
    </ScreenWrapper>
  );
}

