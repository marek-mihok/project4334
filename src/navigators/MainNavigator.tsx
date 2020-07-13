import React, {FunctionComponent} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import SongDetailScreen from '../screens/SongDetailScreen';
import SongListScreen from '../screens/SongListScreen';

const Stack = createStackNavigator<MainParamList>();

const MainNavigator: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="NewsFeed" headerMode="none">
      <Stack.Screen name="NewsFeed" component={NewsFeedScreen} />
      <Stack.Screen name="SongDetail" component={SongDetailScreen} />
      <Stack.Screen name="SongList" component={SongListScreen} />
    </Stack.Navigator>
  );
};

export type MainParamList = {
  NewsFeed: undefined;
  SongDetail: {songId: string};
  SongList: undefined;
};

export default MainNavigator;
