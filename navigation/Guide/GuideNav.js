import GuideList from '../../screens/guide/GuideList';
import GuideContent from '../../screens/guide/GuideContent';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Guide = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GuideList" component={GuideList} />
      <Stack.Screen
        name="GuideContent"
        component={GuideContent}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default Guide;
