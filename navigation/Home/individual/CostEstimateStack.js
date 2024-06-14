import CostEstimate from '../../../screens/home/individualEstimates/costEstimate/CostEstimate';
import Concrete from '../../../screens/home/individualEstimates/costEstimate/Concrete';
import Block from '../../../screens/home/individualEstimates/costEstimate/Block';
import Plaster from '../../../screens/home/individualEstimates/costEstimate/Plaster';
import Tiles from '../../../screens/home/individualEstimates/costEstimate/Tiles';
import Paint from '../../../screens/home/individualEstimates/costEstimate/Paint';
import Foundation from '../../../screens/home/individualEstimates/costEstimate/Foundation';
import Excavation from '../../../screens/home/individualEstimates/costEstimate/Excavation';
import Filling from '../../../screens/home/individualEstimates/costEstimate/Filling';
import Formwork from '../../../screens/home/individualEstimates/costEstimate/Formwork';
import Rod from '../../../screens/home/individualEstimates/costEstimate/Rod';

const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

export default function CostEstimateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CostEstimate"
        component={CostEstimate}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Concrete" component={Concrete} />
      <Stack.Screen name="Block" component={Block} />
      <Stack.Screen name="Plaster" component={Plaster} />
      <Stack.Screen name="Tiles" component={Tiles} />
      <Stack.Screen name="Paint" component={Paint} />
      <Stack.Screen name="Foundation" component={Foundation} />
      <Stack.Screen name="Excavation" component={Excavation} />
      <Stack.Screen name="Filling" component={Filling} />
      <Stack.Screen name="Rods" component={Rod} />
      <Stack.Screen name="Formwork" component={Formwork} />
    </Stack.Navigator>
  );
}
