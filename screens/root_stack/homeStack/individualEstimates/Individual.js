import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// screens
import CostEstimate from './costEstimate/CostEstimate';
import Area from './area/Area';
import Conversion from './conversion/Conversion';

const TopTabs = createMaterialTopTabNavigator();

const Individual = () => {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="Cost Estimate" component={CostEstimate} />
      <TopTabs.Screen name="Area" component={Area} />
      <TopTabs.Screen name="Conversion" component={Conversion} />
    </TopTabs.Navigator>
  );
};

export default Individual;
