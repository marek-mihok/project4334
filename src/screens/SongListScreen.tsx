import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {MainParamList} from '../navigators/MainNavigator';
import {Text, List, Searchbar, ProgressBar} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/src/types';
import {SafeAreaView, useSafeArea} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {useRestApi} from '../providers/RestApiDataProvider';
import { useAsyncStorage } from '../providers/AsyncStorageProvider';

type Props = {
  navigation: StackNavigationProp<MainParamList, 'BottomTabs'>;
  route: RouteProp<MainParamList, 'BottomTabs'>;
  theme: Theme;
};

const SongListScreen: React.FC<Props> = ({navigation, route, theme}) => {
  console.log('SongListScreen re-rendered.');

  const insets = useSafeArea();
  const {state} = useAsyncStorage();
  const songs = state.songs;
  const {loading, progress} = useRestApi();
  console.log('progress:', progress);

  
//   const [saved, setSaved] = useState(savedCount);
//   const [total, setTotal] = useState(totalCount);
// useEffect(() => {
//   setSaved(savedCount);
//   setTotal(totalCount);
// }, [savedCount, totalCount]);

  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Check flat list props
  // TODO: Slovo - nová vášeň - wrong encoding
  // TODO: show loading inficator while loading in async storage
  // TODO: Generalize header visibility on top
  // TODO: add search based on artist or topic
  // TODO: search: prioritise songs starting with searched string

  // if icons not showing, link them with: npx react-native link react-native-vector-icons
  const renderItem = ({item}) => (<List.Item
    title={songs[item]?.title || '(untitled)'}
    description="Autor · Album"
    left={props => <List.Icon {...props} icon="music" /* TODO: add songId to navigation */ />}
    onPress={() => {
      navigation.navigate('SongDetail', {songId: songs[item]?.id});
      // console.log(songs[item]);
    }}
  />);

  const searchFilter = (searchInput: string) => {
    const searchText = searchInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
    const filteredSongs = Object.keys(songs).filter((item) => {
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
      <View style={{elevation: 4, zIndex: 100}}>
        <Header title={'Piesne'} backButtonVisible={false} />
      </View>
      
      <View style={[styles.searchBarContainer, {marginTop: 54 + 6}]}>
        <Searchbar
          placeholder="Hľadať pieseň"
          style={{height: 54, margin: 0}}
          value={searchQuery}
          onChangeText={(query: string) => {
            setSearchQuery(query);
          }}
          selectionColor={'#44d480'}
        />
      </View>
      
      {!loading && songs ? (
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{paddingHorizontal: 16}}
          ListEmptyComponent={
            <View style={{paddingTop: 12}}>
              <Text>
                Nenašli sme žiadnu pieseň zodpovedajúcu hľadanému výrazu.
              </Text>
            </View>
          }
          style={styles.scrollView}
          data={
            searchQuery.length > 0
              ? searchFilter(searchQuery)
              : Object.keys(songs)
          }
          renderItem={renderItem}
          keyExtractor={(item, index) => 'list-item-' + index}
          initialNumToRender={24}>
          <Text>Test</Text>
        </FlatList>
      ) : (
        <>
        <Text>Downloading {progress}</Text>
        {/* <ProgressBar progress={progress} color={'green'} /> */}
        </>
      )}
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
  },
});

export default SongListScreen;
