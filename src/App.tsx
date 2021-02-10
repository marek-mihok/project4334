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
import {SongsProvider} from './providers/SongProvider';

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AsyncStorageProvider>
        <SongsProvider>
          <RestApiDataProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <MainNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </RestApiDataProvider>
        </SongsProvider>
      </AsyncStorageProvider>
    </PaperProvider>
  );
};

export default App;
