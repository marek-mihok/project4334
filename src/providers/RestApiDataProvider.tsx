// https://4334.sk/wp-json/wp/v2/song?orderby=date&order=desc&orderby=date&after=2020-05-24T13:00:00

import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useAsyncStorage, SET_SONG, SET_ALBUM} from './AsyncStorageProvider';

export const MAX_ATTEMPTS_COUNT = 'MAX_ATTEMPTS_COUNT';

type RestApiDataContext = {
  loading: boolean;
  fetchSongData: () => Promise<any[]>;
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
  const isInternetReachable = Boolean(useNetInfo());
  const isInternetReachableRef = useRef<boolean | null>();
  const {dispatch, state} = useAsyncStorage();

  useEffect(() => {
    isInternetReachableRef.current = isInternetReachable;
  }, [isInternetReachable]);

  const fetchSongData = async () => {
    console.log('Fetching song data from WP REST API...')
    let allData: any[] = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    // TODO: orderby not working
    // TODO: fetch albums and artists
    // TODO: fetch just recent content


    while (morePagesAvailable) {
      currentPage++;
      const response = await fetch(
        `https://4334.sk/wp-json/wp/v2/song?per_page=100&order=asc&orderby=date&page=${currentPage}`,
        );
        let data = await response.json();
        let total_pages = response.headers?.map['x-wp-totalpages']; // TODO: Handle if undefined
        data.forEach((e: any) => allData.unshift(e));
        morePagesAvailable = currentPage < total_pages - 0; // TODO: remove -2
      }
      allData.forEach((item) => {
        if(state.songs[item.id] === undefined){
          console.log('Adding song item to async storage:',item.id, item);
          dispatch({ type: SET_SONG, payload: { songId: item.id, song: item } });
        }
      });
      // console.log('time:',new Date().toISOString());
    setLoading(false);
    console.log('Song data are fetched.')
    return allData;
  };

  const fetchAlbumData = async () => {
    console.log('Fetching album data from WP REST API...')
    let allData: any[] = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    // TODO: orderby not working
    // TODO: fetch albums and artists
    // TODO: fetch just recent content


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
      allData.forEach((item) => {
        if(state.songs[item.id] === undefined){
          console.log('Adding album item to async storage:',item.id, item);
          dispatch({ type: SET_ALBUM, payload: { albumId: item.id, album: item } });
        }
      });
      // console.log('time:',new Date().toISOString());
    setLoading(false);
    console.log('Album data are fetched.')
    return allData;
  };

  useEffect(() => {
    if(isInternetReachable){
      console.log('Connected to internet.');
      fetchSongData();
      fetchAlbumData();
    }
  }, []);

  const value = {
    loading,
    fetchSongData,
  };

  return (
    <RestApiDataContext.Provider value={value}>
      {children}
    </RestApiDataContext.Provider>
  );
};

export default RestApiDataProvider;
