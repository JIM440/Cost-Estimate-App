import { createStackNavigator } from '@react-navigation/stack';
// screens
import Area from '../../../screens/home/individualEstimates/area/Area';
import Circle from '../../../screens/home/individualEstimates/area/Circle';
import Square from '../../../screens/home/individualEstimates/area/Square';
import Triangle from '../../../screens/home/individualEstimates/area/Triangle';
import Rectangle from '../../../screens/home/individualEstimates/area/Rectangle';
import Trapezium from '../../../screens/home/individualEstimates/area/Trapezium';
import Ellipse from '../../../screens/home/individualEstimates/area/Ellipse';

const Stack = createStackNavigator();

const AreaStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Area" component={Area} />
      <Stack.Screen
        name="Circle"
        component={Circle}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Square"
        component={Square}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Triangle"
        component={Triangle}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Rectangle"
        component={Rectangle}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Trapezium"
        component={Trapezium}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Ellipse"
        component={Ellipse}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AreaStack;
