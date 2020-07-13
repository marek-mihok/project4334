import React, { useState, FunctionComponent } from 'react';
import {View, Animated, StyleSheet, FlatList} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MainParamList } from '../navigators/MainNavigator';
import {Text, List} from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';
import {SafeAreaView, useSafeArea} from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useAsyncStorage } from '../providers/AsyncStorageProvider';

type Props = {
  navigation: StackNavigationProp<MainParamList, 'SongList'>;
  route: RouteProp<MainParamList, 'SongList'>;
  theme: Theme;
};

const SongListScreen: FunctionComponent<Props> = ({navigation, route, theme}) => {
  const insets = useSafeArea();
  // const [loading, setLoading] = useState(true);

  // animation for header
  const headerScrollY = new Animated.Value(0);
  const headerDiffClamp = Animated.diffClamp(headerScrollY, 0, 62 + insets.top);
  const headerTranslateY = headerDiffClamp.interpolate({
    inputRange: [0, 62 + insets.top],
    outputRange: [0, -62 - insets.top],
  });
  
  const { state } = useAsyncStorage();
    
    // TODO: Check flat list props
    // TODO: Slovo - nová vášeň - wrong encoding


    // if icons not showing, link them with: npx react-native link react-native-vector-icons
    const renderItem = ({item}) => (<List.Item
      title={state.songs[item]?.title?.rendered || '(untitled)'}
      description="Autor · Album"
      left={props => <List.Icon {...props} icon="music" /* TODO: add songId to navigation */ />}
      onPress={() => {navigation.navigate('SongDetail', {songId: state.songs[item]?.id});}}
    />);
    
    return (
      <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: 0,
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Animated.View
        style={{
          transform: [{translateY: headerTranslateY}],
          elevation: 4,
          zIndex: 100,
        }}>
        <Header title={'Piesne'} />
      </Animated.View>
     {state.songs && (<FlatList contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 12 + 54}} // TODO: adjust padding bottom based on button width and device screen; adjust padding top based on header height
        style={styles.scrollView}
        onScroll={event => {
          headerScrollY.setValue(event.nativeEvent.contentOffset.y);
        }} data={Object.keys(state.songs)} renderItem={renderItem} keyExtractor={item => state.songs[item]?.id} initialNumToRender={24} />)}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
  },
});

export default SongListScreen;
