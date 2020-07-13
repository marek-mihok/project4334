import React, {FunctionComponent} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import SongListScreen from '../screens/SongListScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// TODO: change height of bottom tab navigator

const BottomTabsNavigator: FunctionComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName={'NewsFeed'}
      lazy={false}
      tabBarOptions={{
        activeTintColor: '#44d480',
        tabStyle: {},
        labelStyle: {},
        style: {paddingTop: 5, paddingBottom: 5},
      }}>
      <Tab.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{
          tabBarLabel: 'Domov',
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
          tabBarIcon: ({color, size}) => (
            <Icon name="music" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
