// GuideList.js
import { light_bg_blue } from '../../../styles/colors';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import guides from './Data';

const GuideList = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      {guides.map((guide) => (
        <TouchableOpacity
          key={guide.id}
          style={{
            backgroundColor: light_bg_blue,
            marginTop: 18,
            marginHorizontal: 10,
            borderRadius: 16,
            padding: 10,
          }}
          onPress={() => navigation.navigate('GuideContent', guide)}
        >
          <Text>{guide.title}</Text>
          <Text>{guide.content}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GuideList;
