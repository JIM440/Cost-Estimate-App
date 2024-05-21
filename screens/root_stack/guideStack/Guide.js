import GuideList from './GuideList';
import GuideContent from './GuideContent';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Guide = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GuideList" component={GuideList} />
      <Stack.Screen name="GuideContent" component={GuideContent} />
    </Stack.Navigator>
  );
};

export default Guide;
