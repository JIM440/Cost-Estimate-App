import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingleHouse from './Single/SingleHouse';
import MultiHouse from './Multi/MultiHouse';

const Stack = createStackNavigator();

const HouseCategory = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SingleHouse" component={SingleHouse} />
      <Stack.Screen name="MultiHouse" component={MultiHouse} options={{}} />
    </Stack.Navigator>
  );
};

export default HouseCategory;
