import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { containerStyles } from '../styles/utility';
import ScreenWrapper from '../components/ScreenWrapper';

export default function ShareApp() {
  return (
    <ScreenWrapper>
      <View style={containerStyles.container}>
        <Text>ShareApp</Text>
      </View>
    </ScreenWrapper>
  );
}

