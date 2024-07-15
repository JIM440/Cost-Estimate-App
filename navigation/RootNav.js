import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerContentScrollView,
    DrawerItem,
    DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

import { light_bg_blue, primary_color, white } from "../styles/colors";

// icons
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
  } from '@expo/vector-icons';

// // screens
// guides
import GuideHome from "../screens/guide/GuideList";
import BlockGuide from "../screens/guide/Block";
import ConcreteGuide from "../screens/guide/Concrete";
import ExcavationGuide from "../screens/guide/Excavation";
import FillingGuide from "../screens/guide/Filling";
import FormworkGuide from "../screens/guide/Formwork";
import FoundationGuide from "../screens/guide/Foundation";
import HollowSlabGuide from "../screens/guide/HollowSlab";
import PaintGuide from "../screens/guide/Paint";
import PlasterGuide from "../screens/guide/Plaster";
import RCSlabGuide from "../screens/guide/RCSlab";
import RodsGuide from "../screens/guide/Rods";
import RoofingGuide from "../screens/guide/Roofing";
import TilesGuide from "../screens/guide/Tiles";
// cost estimate
import CostEstimate from "../screens/home/individualEstimates/costEstimate/CostEstimate";
import Block from "../screens/home/individualEstimates/costEstimate/Block";
import Concrete from "../screens/home/individualEstimates/costEstimate/Concrete";
import Excavation from "../screens/home/individualEstimates/costEstimate/Excavation";
import Filling from "../screens/home/individualEstimates/costEstimate/Filling";
import Formwork from "../screens/home/individualEstimates/costEstimate/Formwork";
import Foundation from "../screens/home/individualEstimates/costEstimate/Foundation";
import Hollowaslab from "../screens/home/individualEstimates/costEstimate/Hollowaslab";
import Paint from "../screens/home/individualEstimates/costEstimate/Paint";
import Plaster from "../screens/home/individualEstimates/costEstimate/Plaster";
import RCSlab from "../screens/home/individualEstimates/costEstimate/RCSlab";
import Rod from "../screens/home/individualEstimates/costEstimate/Rod";
import Roofing from "../screens/home/individualEstimates/costEstimate/Roofing";
import Tiles from "../screens/home/individualEstimates/costEstimate/Tiles";
// area
import AreaHome from "../screens/home/individualEstimates/area/Area";
import Circle from "../screens/home/individualEstimates/area/Circle";
import Ellipse from "../screens/home/individualEstimates/area/Ellipse";
import Rectangle from "../screens/home/individualEstimates/area/Rectangle";
import Square from "../screens/home/individualEstimates/area/Square";
import Trapezium from "../screens/home/individualEstimates/area/Trapezium";
import Triangle from "../screens/home/individualEstimates/area/Triangle";
// conversion
import Conversion from "../screens/home/individualEstimates/conversion/Conversion";
import Angle from "../screens/home/individualEstimates/conversion/Angle";
import Area from "../screens/home/individualEstimates/conversion/Area";
import Length from "../screens/home/individualEstimates/conversion/Length";
import Pressure from "../screens/home/individualEstimates/conversion/Pressure";
import Temperature from "../screens/home/individualEstimates/conversion/Temperature";
import Volume from "../screens/home/individualEstimates/conversion/Volume";
import Weight from "../screens/home/individualEstimates/conversion/Weight";
// house category
import HouseCategory from "../screens/home/houseCategory/HouseCategory";
import SingleStorey from "../screens/home/houseCategory/Single/SingleHouse";
import MultiStorey from "../screens/home/houseCategory/Multi/MultiHouse";
// time management
import TimeManagement from "../screens/timeManagement/Time";
// rate app
import RateApp from "../screens/RateApp";
// settings
import Settings from "../screens/Settings";
// share app
import ShareApp from "../screens/ShareApp";
import { View } from "react-native";

const IndividualTopTabs = () => {
    return (
        <View style={{ flex: 1, backgroundColor: white }}>
          <TopTab.Navigator
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
            <TopTab.Screen
              name="CostEstimateStack"
              component={CostEstimate}
              options={{ tabBarLabel: 'Cost Estimate' }}
            />
            <TopTab.Screen
              name="AreaStack"
              component={AreaHome}
              options={{ tabBarLabel: 'Area' }}
            />
            <TopTab.Screen
              name="ConversionStack"
              component={Conversion}
              options={{ tabBarLabel: 'Conversion' }}
            />
          </TopTab.Navigator>
        </View>
      );
}


const HomeTopTab = () => {
    return (
        <TopTab.Navigator
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
          <TopTab.Screen
            name="Individual"
            component={IndividualTopTabs}
            options={{ tabBarLabel: 'Individual Estimates' }}
          />
          <TopTab.Screen
            name="HouseStack"
            component={HouseCategory}
            options={{ tabBarLabel: 'House Category' }}
          />
        </TopTab.Navigator>
      );
}


const HomeBottomTab = () => {
    return (
        <BottomTab.Navigator
          screenOptions={{
            tabBarActiveTintColor: primary_color,
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <BottomTab.Screen
            name="Home"
            component={HomeTopTab}
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
            component={GuideHome}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Image source={require('../assets/icons/IconParkSolidBook.png')} />
                ) : (
                  <Image source={require('../assets/icons/IconParkOutlineBook.png')} />
                );
              },
            }}
          />
          <BottomTab.Screen
            name="Time"
            component={TimeManagement}
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
}


const DrawerNav = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerTitle: 'Cost Estimate',
          headerStyle: {
            backgroundColor: primary_color,
          },
          headerTintColor: white,
          drawerActiveBackgroundColor: light_bg_blue,
          drawerActiveTintColor: primary_color,
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItem
                label="Cost Estimate"
                labelStyle={{ fontSize: 24, fontWeight: 'bold' }}
              />
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="BottomTab"
          component={HomeBottomTab}
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? 'home-sharp' : 'home-outline'}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? 'settings' : 'settings-outline'}
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="Share"
          component={ShareApp}
          options={{
            drawerLabel: 'Share App',
            drawerIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name={focused ? 'share-variant' : 'share-variant-outline'}
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="Rate"
          component={RateApp}
          options={{
            drawerLabel: 'Rate App',
            drawerIcon: ({ color, size, focused }) => {
              return (
                <FontAwesome
                  name={focused ? 'star' : 'star-o'}
                  color={color}
                  size={size}
                />
              );
            },
          }}
        />
      </Drawer.Navigator>
    );
  };


const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNav"
        component={DrawerNav}
        options={{ headerShown: false, }}
        />
        {/* house category */}
        <Stack.Screen
        name="SingleStorey"
        component={SingleStorey}
        options={{ title: "Single Storey" }}
      />
            <Stack.Screen
        name="MultiStorey"
        component={MultiStorey}
        options={{ title: "Multi Storey" }}
      />
        {/* guides */}
      <Stack.Screen
        name="roofingGuide"
        component={RoofingGuide}
        options={{ title: "Roofing Guide" }}
      />
      <Stack.Screen
        name="rodsGuide"
        component={RodsGuide}
        options={{ title: "Rod Guide" }}
      />
      <Stack.Screen
        name="formworkGuide"
        component={FormworkGuide}
        options={{ title: "Formwork Guide" }}
      />
      <Stack.Screen
        name="rcslabGuide"
        component={RCSlabGuide}
        options={{ title: "RC Slab Guide Guide" }}
      />
      <Stack.Screen
        name="hollowblockslabGuide"
        component={HollowSlabGuide}
        options={{ title: "Hollow Block Slab Guide" }}
      />
      <Stack.Screen
        name="plasterGuide"
        component={PlasterGuide}
        options={{ title: "Plaster Guide" }}
      />
      <Stack.Screen
        name="paintGuide"
        component={PaintGuide}
        options={{ title: "Paint Guide" }}
      />
      <Stack.Screen
        name="tilesGuide"
        component={TilesGuide}
        options={{ title: "Tiles Guide" }}
      />
      <Stack.Screen
        name="foundationGuide"
        component={FoundationGuide}
        options={{ title: "Foundation Guide" }}
      />
      <Stack.Screen
        name="fillingGuide"
        component={FillingGuide}
        options={{ title: "Filling Guide" }}
      />
      <Stack.Screen
        name="excavationGuide"
        component={ExcavationGuide}
        options={{ title: "Excavation Guide" }}
      />
      <Stack.Screen
        name="concreteGuide"
        component={ConcreteGuide}
        options={{ title: "Concrete Guide" }}
      />
      <Stack.Screen
        name="blockGuide"
        component={BlockGuide}
        options={{ title: "Block Guide" }}
      />


      {/* cost estimate */}
      <Stack.Screen name="Concrete" component={Concrete} />
      <Stack.Screen name="Block" component={Block} />
      <Stack.Screen name="Plaster" component={Plaster} />
      <Stack.Screen name="Tiles" component={Tiles} />
      <Stack.Screen name="Paint" component={Paint} />
      <Stack.Screen name="HollowSlab" component={Hollowaslab} options={{title: 'Hollow Block Slab'}} />
      <Stack.Screen name="RCSlab" component={RCSlab} options={{title: 'RC Slab'}} />
      <Stack.Screen name="Foundation" component={Foundation} />
      <Stack.Screen name="Excavation" component={Excavation} />
      <Stack.Screen name="Filling" component={Filling} />
      <Stack.Screen name="Rods" component={Rod} />
      <Stack.Screen name="Roofing" component={Roofing} />
      <Stack.Screen name="Formwork" component={Formwork} />
    

      {/* area */}
      <Stack.Screen name="Circle" component={Circle} />
      <Stack.Screen name="Square" component={Square} />
      <Stack.Screen name="Triangle" component={Triangle} />
      <Stack.Screen name="Rectangle" component={Rectangle} />
      <Stack.Screen name="Trapezium" component={Trapezium} />
      <Stack.Screen name="Ellipse" component={Ellipse} />

      {/* conversion */}
      <Stack.Screen name="Length" component={Length} />
      <Stack.Screen name="Area" component={Area} />
      <Stack.Screen name="Volume" component={Volume} />
      <Stack.Screen name="Weight" component={Weight} />
      <Stack.Screen name="Temperature" component={Temperature} />
      <Stack.Screen name="Pressure" component={Pressure} />
      <Stack.Screen name="Angle" component={Angle} />

    </Stack.Navigator>
  );
};

export default RootStack;
