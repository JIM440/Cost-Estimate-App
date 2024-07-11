import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HouseCategory from '../../../screens/home/houseCategory/HouseCategory';
import SingleStack from '../../../screens/home/houseCategory/Single/SingleHouse';
import MultiStack from '../../../screens/home/houseCategory/Multi/MultiHouse';

const Stack = createStackNavigator();

const HouseStackCategory = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HouseCategory" component={HouseCategory} />
      <Stack.Screen
        name="SingleStack"
        component={SingleStack}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MultiStack"
        component={MultiStack}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default HouseStackCategory;
