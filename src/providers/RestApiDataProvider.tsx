// https://4334.sk/wp-json/wp/v2/song?orderby=date&order=desc&orderby=date&after=2020-05-24T13:00:00

import React, {FunctionComponent, useContext, useEffect, useRef, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {useAsyncStorage, SET_SONGS, SET_ALBUMS, SET_LAST_FETCHED, SET_ARTISTS} from './AsyncStorageProvider';

export const MAX_ATTEMPTS_COUNT = 'MAX_ATTEMPTS_COUNT';



type RestApiDataContext = {
  loading: boolean;
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
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [songsLoading, setSongsLoading] = useState(true);
  const [artistsLoading, setArtistsLoading] = useState(true);
  const totalCount = useRef(0);
  const [progress, setProgress] = useState(0);
  const isInternetReachable = Boolean(useNetInfo());
  const isInternetReachableRef = useRef<boolean | null>();
  const {dispatch, state} = useAsyncStorage();

  console.log('RestApiDataProvider re-rendered.');

  useEffect(() => {
    isInternetReachableRef.current = isInternetReachable;
  }, [isInternetReachable]);

  const 
    username = '',
    password = '',
    headers = new Headers()

    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    const payload = {
    method: "GET",
    headers
  }

  const fetchSongData = async () => {
    console.log('Fetching song data from WP REST API from', state.lastFetched);
    let allData: any[] = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    // TODO: orderby not working
    // TODO: finish implementation of progressbar
    // TODO: fetch just recent content


    while (morePagesAvailable) {
      currentPage++;
      const response = await fetch(
        `https://4334.sk/wp-json/wp/v2/song?per_page=100&order=desc&orderby=date&page=${currentPage}`, payload
        ).then(res => {
          if (res.ok) {
            console.log('-----ok-----')
            return res
          } else {
            console.log('-----error-----', res)
            throw Error(res.statusText);
          }
        })
        .catch(error => console.error(error));

        let total_pages = response.headers?.map['x-wp-totalpages']; // TODO: Handle if undefined
        let data = await response.json();
        data.forEach((e: any) => allData.unshift(e));
        morePagesAvailable = currentPage < total_pages - 0; // TODO: remove -2
      }
      totalCount.current = allData.length;
      
      const songs: any = {} // TODO: fix type
      allData.forEach((item, idx) => {
        songs[item.id] = {...item, title: item.title.rendered};
        // let sCount = ++ idx;
        // console.log('saved songs count:', sCount, totalCount.current);
        // setProgress(((sCount*100)/totalCount.current)/100);
      });
      dispatch({ type: SET_SONGS, payload: songs });
      dispatch({type: SET_LAST_FETCHED, payload: {time: new Date().toISOString()}})
    
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
        `https://4334.sk/wp-json/wp/v2/album?per_page=100&page=${currentPage}`, payload
        );
        let data = await response.json();
        let total_pages = response.headers?.map['x-wp-totalpages']; // TODO: Handle if undefined
        data.forEach((e: any) => allData.unshift(e));
        morePagesAvailable = currentPage < total_pages - 0; // TODO: remove -2
      }
      
      const albums: any = {}; //TODO: fix type
      allData.forEach((item, idx) => {
        albums[item.id] = {...item, title: item.title.rendered, artistId: item.artist, imageInfoUrl: item?._links["wp:attachment"]?.href || ''};
        // let sCount = ++ idx;
        // console.log('saved albums count:', sCount);
        // setProgress(((sCount*100)/totalCount.current)/100); // TODO
      });
      console.log('setting albums:', albums)
      dispatch({ type: SET_ALBUMS, payload: albums });
      
    console.log('Album data are fetched.')
    return allData;
  };

  const fetchArtistData = async () => {
    console.log('Fetching artist data from WP REST API...')
    let allData: any[] = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    while (morePagesAvailable) {
      currentPage++;
      const response = await fetch(
        `https://4334.sk/wp-json/wp/v2/artist?per_page=100&page=${currentPage}`, payload
        );
        let data = await response.json();
        let total_pages = response.headers?.map['x-wp-totalpages']; // TODO: Handle if undefined
        data.forEach((e: any) => allData.unshift(e));
        morePagesAvailable = currentPage < total_pages - 0; // TODO: remove -2
      }
      
      const artists: any = {}; //TODO: fix type
      allData.forEach((item, idx) => {
        artists[item.id] = {...item, title: item.title.rendered, imageInfoUrl: item?._links["wp:attachment"]?.href || ''};
        // let sCount = ++ idx;
        // console.log('saved artists count:', sCount);
        // setProgress(((sCount*100)/totalCount.current)/100); // TODO
      });
      console.log('setting artists:', artists)
      dispatch({ type: SET_ARTISTS, payload: artists });
      
    console.log('Artist data are fetched.')
    return allData;
  };

  useEffect(() => {
    if(!songsLoading && !albumsLoading && !artistsLoading){
      setLoading(false);
    }
  }, [songsLoading, albumsLoading, artistsLoading])

  useEffect(() => {
    if(isInternetReachable){
      console.log('Connected to internet.');
      fetchAlbumData().then(() => {
        setAlbumsLoading(false);
      });
      fetchSongData().then(() => {
        setSongsLoading(false);
      });
      fetchArtistData().then(() => {
        setArtistsLoading(false);
      });
      // const async = require('async');
      // async.parallel({songs: fetchSongData, albums: fetchAlbumData}, (err: any, results: any) => {
      //   console.log('errors:', err);
      //   console.log('results-songs:', results.songs);
      //   console.log('results-albums:', results.albums);
      // })
    }
  }, []);

  const value: RestApiDataContext = {
    loading,
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
