import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HouseStackCategory from './houseCategory/HouseStackCategory';
import Individual from './individual/Individual';
import { primary_color, white } from '../../styles/colors';

const TopTabs = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: primary_color, fontWeight: '700' },
        tabBarActiveTintColor: white,
        tabBarInactiveTintColor: '#ECECEC',
        tabBarIndicatorStyle: {
          backgroundColor: white,
          height: 4,
        },
      }}
    >
      <TopTabs.Screen
        name="HouseStack"
        component={HouseStackCategory}
        options={{ tabBarLabel: 'House Category' }}
      />
      <TopTabs.Screen
        name="Individual"
        component={Individual}
        options={{ tabBarLabel: 'Individual Estimates' }}
      />
    </TopTabs.Navigator>
  );
};

export default Home;
