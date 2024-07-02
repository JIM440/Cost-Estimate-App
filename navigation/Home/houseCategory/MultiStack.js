import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import Foundation from '../../../screens/home/houseCategory/Multi/foundation/Foundation';
// import Elevation from '../../../screens/home/houseCategory/Multi/elevation/Elevation';
// import Roofing from '../../../screens/home/houseCategory/Multi/roofing/Roofing';
import MultiHouse from '../../../screens/home/houseCategory/Multi/MultiHouse';
import Floor from '../../../screens/home/houseCategory/Multi/Floor';

const MultiStackNav = createStackNavigator();

const MultiStack = () => {
  return (
    <MultiStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MultiStackNav.Screen
        name="MultiHouse"
        component={MultiHouse}
        options={{ headerShown: true, headerTitle: 'Multi Storey' }}
      />
      <MultiStackNav.Screen
        name="Floor"
        component={Floor}
        options={{ headerShown: true, headerTitle: 'Floor' }}
      />
    </MultiStackNav.Navigator>
  );
};

export default MultiStack;
