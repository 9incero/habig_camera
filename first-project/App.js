import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigation from './navigation/Stack';
import TabNavigation from './navigation/Tab';

function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
      {/* <TabNavigation /> */}
    </NavigationContainer>
  )
}

export default App;