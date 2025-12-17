import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { white, primary_color } from '../../../../styles/colors';

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

export default function IndividualTabsLayout() {
  return (
    <View style={styles.container}>
      <MaterialTopTabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: primary_color,
            height: 3,
          },
          tabBarActiveTintColor: primary_color,
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontWeight: '600',
            fontSize: 14,
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
          name="cost-estimate"
          options={{ tabBarLabel: 'Cost Estimate' }}
        />
        <MaterialTopTabs.Screen name="area" options={{ tabBarLabel: 'Area' }} />
        <MaterialTopTabs.Screen
          name="conversion"
          options={{ tabBarLabel: 'Conversion' }}
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

