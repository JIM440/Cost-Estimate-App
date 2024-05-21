// GuideContent.js
import React from 'react';
import { View, Text } from 'react-native';
import { light_bg_blue } from '../../../styles/colors';

const GuideContent = ({ route }) => {
  const { content } = route.params;

  return (
    <View
      style={{
        backgroundColor: light_bg_blue,
        marginTop: 18,
        marginHorizontal: 10,
        borderRadius: 16,
        padding: 10,
      }}
    >
      <Text>{content}</Text>
    </View>
  );
};

export default GuideContent;
