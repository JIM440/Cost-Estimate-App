import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { white, primary_color } from '../../../styles/colors';

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

export default function HomeTabsLayout() {
  return (
    <View style={styles.container}>
      <MaterialTopTabs
        screenOptions={{
          tabBarStyle: { backgroundColor: primary_color },
          tabBarActiveTintColor: white,
          tabBarInactiveTintColor: '#ECECEC',
          tabBarIndicatorStyle: {
            backgroundColor: white,
            height: 4,
          },
          headerShown: true,
          headerStyle: {
            backgroundColor: primary_color,
          },
          headerTintColor: white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTransparent: false,
          headerShadowVisible: true,
        }}
      >
        <MaterialTopTabs.Screen
          name="individual"
          options={{ tabBarLabel: 'Individual Estimates' }}
        />
        <MaterialTopTabs.Screen
          name="house-category"
          options={{ tabBarLabel: 'House Category' }}
        />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

