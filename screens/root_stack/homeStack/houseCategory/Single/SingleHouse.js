import { View, Text, Button } from 'react-native';
import React from 'react';

const SingleHouse = ({ navigation }) => {
  return (
    <View>
      <Text>SingleHouse</Text>
      <Button
        title="Go to Multi-House"
        onPress={() => {
          navigation.navigate('MultiHouse');
        }}
      />
    </View>
  );
};

export default SingleHouse;
