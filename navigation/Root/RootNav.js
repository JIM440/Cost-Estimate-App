import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// icons
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
// screens
import Home from '../Home/HomeNav';
import Guide from '../Guide/GuideNav';
import Time from '../../screens/timeManagement/Time';
// styles
import { primary_color } from '../../styles/colors';

const BottomTab = createBottomTabNavigator();

const RootStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: primary_color,
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Guides"
        component={Guide}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return focused ? (
              <FontAwesome5 name="book" size={size} color={color} />
            ) : (
              <Feather name="book" color={color} size={size} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Time"
        component={Time}
        options={{
          tabBarLabel: 'Time Management',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={focused ? 'time' : 'time-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default RootStack;
