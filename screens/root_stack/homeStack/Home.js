import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HouseCategory from './houseCategory/HouseCategory';
import Individual from './individualEstimates/Individual';
import { primary_color, white } from '../../../styles/colors';

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
        },
      }}
    >
      <TopTabs.Screen
        name="House"
        component={HouseCategory}
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

const styles = StyleSheet.create({});
