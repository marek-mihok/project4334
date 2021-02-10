import React, { useState, FunctionComponent } from 'react';
import {View, Animated, StyleSheet, FlatList} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { MainParamList } from '../navigators/MainNavigator';
import {Text, List, Searchbar} from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';
import {SafeAreaView, useSafeArea} from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useAsyncStorage } from '../providers/AsyncStorageProvider';
import { useSongs } from '../providers/SongProvider';

type Props = {
  navigation: StackNavigationProp<MainParamList, 'BottomTabs'>;
  route: RouteProp<MainParamList, 'BottomTabs'>;
  theme: Theme;
};

const SongListScreen: FunctionComponent<Props> = ({navigation, route, theme}) => {
  
  const insets = useSafeArea();
  const { state } = useAsyncStorage();
  const {songs} = useSongs();
  console.log('songs', songs);

  const [searchQuery, setSearchQuery] = useState('');

    
    // TODO: Check flat list props
    // TODO: Slovo - nová vášeň - wrong encoding
    // TODO: show loading inficator while loading in async storage
    // TODO: Generalize header visibility on top
    // TODO: add search based on artist or topic


    // if icons not showing, link them with: npx react-native link react-native-vector-icons
    const renderItem = ({item}) => (<List.Item
      title={songs[item]?.title || '(untitled)'}
      description="Autor · Album"
      left={props => <List.Icon {...props} icon="music" /* TODO: add songId to navigation */ />}
      onPress={() => {navigation.navigate('SongDetail', {songId: songs[item]?.id});}}
    />);

    const searchFilter = (searchInput: string) => {
      const searchText = searchInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
      const filteredSongs = Object.keys(state.songs).filter((item) => {
          return songs[item]?.title?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().match(searchText);
      })
      return filteredSongs;
    }
    

    return (
      <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: 0,
        flex: 1,
        backgroundColor: '#fff',
      }}>
        <View style={{elevation: 4, zIndex: 100, }}>
          <Header title={'Piesne'} backButtonVisible={false}/>
        </View>
        <View style={[styles.searchBarContainer, {marginTop:  54 + 6 }]}> 
          <Searchbar placeholder="Hľadať pieseň" style={{height: 54, margin: 0}} value={searchQuery}
      onChangeText={(query: string) => {setSearchQuery(query)}} selectionColor={'#44d480'} />
        </View>
     {songs && (<FlatList contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{paddingHorizontal: 16}}
        ListEmptyComponent={<View style={{paddingTop: 12}}><Text>Nenašli sme žiadnu pieseň zodpovedajúcu hľadanému výrazu.</Text></View>}
        style={styles.scrollView}
        data={searchQuery.length > 0 ? searchFilter(searchQuery) : Object.keys(songs)} renderItem={renderItem} keyExtractor={(item, index) => 'list-item-' + index} initialNumToRender={24} ><Text>Test</Text></FlatList>)}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
  },
  searchBarContainer: {
    backgroundColor: '#f7f7f7',
    // marginHorizontal: 14,
    // marginTop: 22,
  }
});

export default SongListScreen;
