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
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorageProvider from './providers/AsyncStorageProvider';
import RestApiDataProvider from './providers/RestApiDataProvider';
import MainNavigator from './navigators/MainNavigator';
import BottomTabsNavigator from './navigators/BottomTabsNavigator';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <AsyncStorageProvider>
          <RestApiDataProvider>
            <NavigationContainer>
              {/* <MainNavigator /> */}
              <BottomTabsNavigator />
            </NavigationContainer>
          </RestApiDataProvider>
        </AsyncStorageProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
