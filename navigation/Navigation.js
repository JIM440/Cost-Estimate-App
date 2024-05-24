import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
// icons
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
// screens
import RootStack from './Root/RootNav';
import ShareApp from '../screens/ShareApp';
import RateApp from '../screens/RateApp';
import Settings from '../screens/Settings';
import { light_bg_blue, primary_color, white } from '../styles/colors';

const DrawerNav = createDrawerNavigator();

const DrawerGroup = () => {
  return (
    <DrawerNav.Navigator
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
      <DrawerNav.Screen
        name="RootStack"
        component={RootStack}
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
      <DrawerNav.Screen
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
      <DrawerNav.Screen
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
      <DrawerNav.Screen
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
    </DrawerNav.Navigator>
  );
};

export default DrawerGroup;
