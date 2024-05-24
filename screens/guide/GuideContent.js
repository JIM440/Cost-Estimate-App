// GuideContent.js
import React from 'react';
import { View, Text } from 'react-native';
import { containerStyles } from '../../styles/utility';

const GuideContent = ({ route }) => {
  const { content } = route.params;

  return (
    <View style={containerStyles.container}>
      <Text>{content}</Text>
    </View>
  );
};

export default GuideContent;
