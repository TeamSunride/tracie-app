import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from './Settings';
import ThemeSettings from './ThemeSettings';
import AboutSettings from './AboutSettings';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ThemeSettings"
        component={ThemeSettings}
        options={{headerShown: false}}
      />
      <Stack.Screen name="AboutSettings" component={AboutSettings} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
