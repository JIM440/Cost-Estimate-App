import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// screens
import AreaStack from './AreaStack';
import ConversionStack from './ConversionStack';
import CostEstimateStack from './CostEstimateStack';
import { primary_color, white } from '../../../styles/colors';
import { View } from 'react-native';

const TopTabs = createMaterialTopTabNavigator();

const Individual = () => {
  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <TopTabs.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: primary_color,
            position: 'absolute',
            borderRadius: 8,
            zIndex: -1,
            bottom: '15%',
            height: '70%',
          },
          tabBarActiveTintColor: white,
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <TopTabs.Screen
          name="CostEstimateStack"
          component={CostEstimateStack}
          options={{ tabBarLabel: 'Cost Estimate' }}
        />
        <TopTabs.Screen
          name="AreaStack"
          component={AreaStack}
          options={{ tabBarLabel: 'Area' }}
        />
        <TopTabs.Screen
          name="ConversionStack"
          component={ConversionStack}
          options={{ tabBarLabel: 'Conversion' }}
        />
      </TopTabs.Navigator>
    </View>
  );
};

export default Individual;
