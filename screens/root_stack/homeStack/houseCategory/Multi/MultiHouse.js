import { View, Text, Button } from 'react-native';
import React from 'react';

const MultiHouse = ({ navigation }) => {
  return (
    <View>
      <Text>MultiHouse</Text>
      <Button
        title="Go to single floor"
        onPress={() => {
          navigation.navigate('SingleHouse');
        }}
      />
    </View>
  );
};

export default MultiHouse;
