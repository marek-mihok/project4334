import React, {FunctionComponent} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import SongListScreen from '../screens/SongListScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator: FunctionComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName={'SongList'}
      lazy={false}
      tabBarOptions={{
        activeTintColor: '#44d480',
        tabStyle: {},
        labelStyle: {},
      }}>
      <Tab.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{
          tabBarLabel: 'Domov',
          title: '4334',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SongList"
        component={SongListScreen}
        options={{
          tabBarLabel: 'Piesne',
          title: 'Piesne',
          tabBarIcon: ({color, size}) => (
            <Icon name="music" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
