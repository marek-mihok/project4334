/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import NewsFeedScreen from './screens/NewsFeedScreen';
import SongDetailScreen from './screens/SongDetailScreen';
import FlexWrapTest from './screens/FlexWrapTest';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="NewsFeed" headerMode="none">
            <Stack.Screen name="NewsFeed" component={NewsFeedScreen} />
            <Stack.Screen name="SongDetail" component={SongDetailScreen} />
            <Stack.Screen name="FlexWrapTest" component={FlexWrapTest} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
