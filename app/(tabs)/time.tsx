import { View, Text } from 'react-native';
import React from 'react';
import { containerStyles } from '../../styles/utility';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function Time() {
  return (
    <ScreenWrapper>
      <View style={containerStyles.container}>
        <Text>Include Functionality For Time Management Here</Text>
      </View>
    </ScreenWrapper>
  );
}

