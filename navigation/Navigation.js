import { createDrawerNavigator } from '@react-navigation/drawer';
// icons
// import Ionicon
// screens
import RootStack from '../screens/root_stack/RootStack';
import ShareApp from '../screens/ShareApp';
import RateApp from '../screens/RateApp';
import Settings from '../screens/Settings';
import { primary_color, white } from '../styles/colors';

const DrawerNav = createDrawerNavigator();

const DrawerGroup = () => {
  return (
    <DrawerNav.Navigator
      screenOptions={{
        headerTitle: 'Cost Estimate',
      }}
    >
      <DrawerNav.Screen
        name="RootStack"
        component={RootStack}
        options={{
          drawerLabel: 'Home',
          headerStyle: {
            backgroundColor: primary_color,
          },
          headerTintColor: white,
        }}
      />
      <DrawerNav.Screen name="Settings" component={Settings} />
      <DrawerNav.Screen
        name="Share"
        component={ShareApp}
        options={{ drawerLabel: 'Share App' }}
      />
      <DrawerNav.Screen
        name="Rate"
        component={RateApp}
        options={{ drawerLabel: 'Rate App' }}
      />
    </DrawerNav.Navigator>
  );
};

export default DrawerGroup;
