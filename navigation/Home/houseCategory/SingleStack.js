import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Foundation from '../../../screens/home/houseCategory/Single/foundation/Foundation';
import Elevation from '../../../screens/home/houseCategory/Single/elevation/Elevation';
import Roofing from '../../../screens/home/houseCategory/Single/roofing/Roofing';
import SingleHouse from '../../../screens/home/houseCategory/Single/SingleHouse';

const SingleStackNav = createStackNavigator();

const SingleStack = () => {
  return (
    <SingleStackNav.Navigator screenOptions={{ headerShown: false }}>
      <SingleStackNav.Screen
        name="SingleHouse"
        component={SingleHouse}
        options={{ headerShown: true, headerTitle: 'Single Storey' }}
      />
      <SingleStackNav.Screen
        name="SingleHouseFoundation"
        component={Foundation}
        options={{ headerShown: true, headerTitle: 'Foundation' }}
      />
      <SingleStackNav.Screen
        name="SingleHouseElevation"
        component={Elevation}
        options={{ headerShown: true, headerTitle: 'Elevation' }}
      />
      <SingleStackNav.Screen
        name="SingleHouseRoofing"
        component={Roofing}
        options={{ headerShown: true, headerTitle: 'Roofing' }}
      />
    </SingleStackNav.Navigator>
  );
};

export default SingleStack;
