import React, {FunctionComponent} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import SongListScreen from '../screens/SongListScreen';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// function MyTabBar({state, descriptors, navigation}) {
//   return (
//     <View style={{flexDirection: 'row'}}>
//       {state.routes.map((route, index) => {
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityStates={isFocused ? ['selected'] : []}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{flex: 1}}>
//             <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

const BottomTabsNavigator: FunctionComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName={'NewsFeed'}
      lazy={false}
      // tabBar={props => <MyTabBar {...props} />}
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
          // tabBarBadge: 3,
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
