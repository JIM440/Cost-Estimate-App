import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MultiHouse from '../../../screens/home/houseCategory/Multi/MultiHouse';
import SingleHouse from '../../../screens/home/houseCategory/Single/SingleHouse';
import HouseCategory from '../../../screens/home/houseCategory/HouseCategory';

const Stack = createStackNavigator();

const HouseStackCategory = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HouseCategory" component={HouseCategory} />
      <Stack.Screen
        name="SingleHouse"
        component={SingleHouse}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MultiHouse"
        component={MultiHouse}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default HouseStackCategory;
