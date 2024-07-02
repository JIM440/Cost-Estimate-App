import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HouseCategory from '../../../screens/home/houseCategory/HouseCategory';
import SingleStack from './SingleStack';
import MultiStack from './MultiStack';

const Stack = createStackNavigator();

const HouseStackCategory = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HouseCategory" component={HouseCategory} />
      <Stack.Screen
        name="SingleStack"
        component={SingleStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MultiStack"
        component={MultiStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HouseStackCategory;
