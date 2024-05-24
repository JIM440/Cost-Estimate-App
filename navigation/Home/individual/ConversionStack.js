import { createStackNavigator } from '@react-navigation/stack';
import Conversion from '../../../screens/home/individualEstimates/conversion/Conversion';
import Length from '../../../screens/home/individualEstimates/conversion/Length';
import Area from '../../../screens/home/individualEstimates/conversion/Area';
import Volume from '../../../screens/home/individualEstimates/conversion/Volume';
import Weight from '../../../screens/home/individualEstimates/conversion/Weight';
import Temperature from '../../../screens/home/individualEstimates/conversion/Temperature';
import Pressure from '../../../screens/home/individualEstimates/conversion/Pressure';
import Angle from '../../../screens/home/individualEstimates/conversion/Angle';

const Stack = createStackNavigator();

const ConversionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Conversion"
        component={Conversion}
        options={{ headerShown: false }}
      />
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

export default ConversionStack;
