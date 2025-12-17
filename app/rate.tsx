import { View, Text } from 'react-native';
import React from 'react';
import { containerStyles } from '../styles/utility';
import ScreenWrapper from '../components/ScreenWrapper';

export default function RateApp() {
  return (
    <ScreenWrapper>
      <View style={containerStyles.container}>
        <Text>RateApp</Text>
      </View>
    </ScreenWrapper>
  );
}

