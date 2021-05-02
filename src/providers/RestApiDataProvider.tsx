// https://4334.sk/wp-json/wp/v2/song?orderby=date&order=desc&orderby=date&after=2020-05-24T13:00:00

import React, {FunctionComponent, useContext, useEffect, useRef, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useAsyncStorage, SET_SONGS, SET_ALBUMS, SET_LAST_FETCHED, LOAD_STATE} from './AsyncStorageProvider';
import { useSongs } from './SongProvider';

export const MAX_ATTEMPTS_COUNT = 'MAX_ATTEMPTS_COUNT';

type RestApiDataContext = {
  loading: boolean;
  fetchSongData: () => Promise<any[]>;
  progress: number;
};

const RestApiDataContext = React.createContext<RestApiDataContext | undefined>(
  undefined,
);

export const useRestApiData = () => {
  const context = React.useContext(RestApiDataContext);
  if (!context) {
    throw new Error(
      'useRestApiData must be used within a useRestApiDataProvider',
    );
  }
  return context;
};

const RestApiDataProvider: FunctionComponent = ({children}) => {
  const [loading, setLoading] = useState(true);
  const totalCount = useRef(0);
  const [progress, setProgress] = useState(0);
  const isInternetReachable = Boolean(useNetInfo());
  const isInternetReachableRef = useRef<boolean | null>();
  const {dispatch, state} = useAsyncStorage();
  // const {createSong, createAlbum} = useSongs();

  console.log('RestApiDataProvider re-rendered.');

  useEffect(() => {
    isInternetReachableRef.current = isInternetReachable;
  }, [isInternetReachable]);

  const fetchSongData = async () => {
    console.log('Fetching song data from WP REST API from', state.lastFetched);
    let allData: any[] = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    // TODO: orderby not working
    // TODO: fetch albums and artists
    // TODO: fetch just recent content

    // TODO: if there is something after lastFetched.time - refetch all
          const newDataResponse = await fetch(
        `https://4334.sk/wp-json/wp/v2/song?per_page=1&order=desc&orderby=date&after=${state.lastFetched.time}&page=${1}`,
        );
        let newData = await newDataResponse.json();
        console.log('NEW DATA:', newData);
        if(Object.keys(newData).length === 0){
          return;
        }


    while (morePagesAvailable) {
      currentPage++;
      // const response = await fetch(
      //   `https://4334.sk/wp-json/wp/v2/song?per_page=100&order=desc&orderby=date&after=${state.lastFetched.time}&page=${currentPage}`,
      //   );
      const response = await fetch(
        `https://4334.sk/wp-json/wp/v2/song?per_page=100&order=desc&orderby=date&page=${currentPage}`,
        );
        let data = await response.json();
        let total_pages = response.headers?.map['x-wp-totalpages']; // TODO: Handle if undefined
        data.forEach((e: any) => allData.unshift(e));
        morePagesAvailable = currentPage < total_pages - 0; // TODO: remove -2
      }
      totalCount.current = allData.length;
      const songs: any = {} // TODO: fix type
      allData.forEach((item, idx) => {
        songs[item.id] = {...item, title: item.title.rendered};
        // if(state.songs[item.id] === undefined){
        //   console.log('Adding song item to async storage:',item.id, item);
        //   dispatch({ type: SET_SONG, payload: { songId: item.id, song: item } });
        // }
        // addSong(item);
        // createSong({...item, title: item.title.rendered, albumId: item.album});
        let sCount = ++ idx;
        console.log('saved songs count:', sCount, totalCount.current);
        setProgress(((sCount*100)/totalCount.current)/100);
      });
      dispatch({ type: SET_SONGS, payload: songs });
      dispatch({type: SET_LAST_FETCHED, payload: {time: new Date().toISOString()}})
    // setLoading(false);
    console.log('Song data are fetched. Date:', state.lastFetched);
    return allData;
  };

  const fetchAlbumData = async () => {
    console.log('Fetching album data from WP REST API...')
    let allData: any[] = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    while (morePagesAvailable) {
      currentPage++;
      const response = await fetch(
        `https://4334.sk/wp-json/wp/v2/album?per_page=100&page=${currentPage}`,
        );
        let data = await response.json();
        let total_pages = response.headers?.map['x-wp-totalpages']; // TODO: Handle if undefined
        data.forEach((e: any) => allData.unshift(e));
        morePagesAvailable = currentPage < total_pages - 0; // TODO: remove -2
      }
      const albums: any = {}; //TODO: fix type
      allData.forEach((item, idx) => {
        // createAlbum({...item, title: item.title.rendered, artistId: item.artist, imageInfoUrl: item?._links["wp:attachment"]?.href || ''});
        albums[item.id] = {...item, title: item.title.rendered, artistId: item.artist, imageInfoUrl: item?._links["wp:attachment"]?.href || ''};
        let sCount = ++ idx;
        console.log('saved albums count:', sCount, totalCount.current);
        // setProgress(((sCount*100)/totalCount.current)/100);
      });
      dispatch({ type: SET_ALBUMS, payload: albums });
    console.log('Album data are fetched.')
    return allData;
  };

  useEffect(() => {
    if(isInternetReachable){
      console.log('Connected to internet.');
      // fetchAlbumData().then(() => {
        fetchSongData().then(() => {
          setLoading(false); // TODO
        });
      // });
    }
  }, []);

  const value = {
    loading,
    fetchSongData,
    progress,
  };

  return (
    <RestApiDataContext.Provider value={value}>
      {children}
    </RestApiDataContext.Provider>
  );
};

const useRestApi = () => {
  const restApi = useContext(RestApiDataContext);
  if (restApi == null) {
    throw new Error('useRestApi() called outside of a RestApiDataProvider');
  }
  return restApi;
};

export {RestApiDataProvider, useRestApi};
