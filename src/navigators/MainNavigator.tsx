import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SongDetailScreen from '../screens/SongDetailScreen';
import BottomTabsNavigator from '../navigators/BottomTabsNavigator';

const Stack = createStackNavigator<MainParamList>();

const MainNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs" headerMode="none">
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} />
      <Stack.Screen name="SongDetail" component={SongDetailScreen} />
    </Stack.Navigator>
  );
};

export type MainParamList = {
  BottomTabs: undefined;
  SongDetail: {songId: string};
};

export default MainNavigator;
