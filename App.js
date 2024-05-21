import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// navigation
import DrawerGroup from './navigation/Navigation';

function App() {
  return (
    <NavigationContainer>
      <DrawerGroup />
    </NavigationContainer>
  );
}

export default App;
