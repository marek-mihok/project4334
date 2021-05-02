import AsyncStorage from '@react-native-community/async-storage';
import React, {FunctionComponent, useEffect, useState} from 'react';

type StorageState = {
  songs: {[songId: string]: string};
  albums: {[albumId: string]: string};
  artists: {[artistId: string]: string};
  lastFetched: {time: string};
};

const LOAD_STATE = 'LOAD_STATE';
export const SET_SONGS = 'SET_SONGS';
export const SET_ALBUMS = 'SET_ALBUMS';
export const SET_ARTISTS = 'SET_ARTISTS';
export const SET_LAST_FETCHED = 'SET_LAST_FETCHED';

type ActionType =
  | {
      type: typeof LOAD_STATE;
      payload: StorageState;
    }
  | {
      type: typeof SET_SONGS;
      payload: {[songId: string]: string};
    }
  | {
      type: typeof SET_ALBUMS;
      payload: {[albumId: string]: string};
    }
  | {
      type: typeof SET_ARTISTS;
      payload: {[artistId: string]: string};
    }
  | {
      type: typeof SET_LAST_FETCHED;
      payload: {
        time: string;
      };
    };

const reducer = (state: StorageState, action: ActionType) => {
  switch (action.type) {
    case LOAD_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SONGS:
      return {...state, songs: action.payload};
    case SET_ALBUMS:
      return {...state, albums: action.payload};
    case SET_ARTISTS:
      return {...state, artists: action.payload};
    case SET_LAST_FETCHED:
      return {...state, lastFetched: action.payload};
    default:
      return state;
  }
};

type AsyncStorageContext = {
  state: StorageState;
  dispatch: React.Dispatch<ActionType>;
};

const AsyncStorageContext = React.createContext<
  AsyncStorageContext | undefined
>(undefined);

export const useAsyncStorage = () => {
  const context = React.useContext(AsyncStorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a AsyncStorageProvider');
  }
  return context;
};

const initialState: StorageState = {
  songs: {},
  albums: {},
  artists: {},
  lastFetched: {time: '2014-01-01T00:00:00.000Z'},
};

const AsyncStorageProvider: FunctionComponent = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('state')
      .then(payload => {
        dispatch({
          type: LOAD_STATE,
          payload: JSON.parse(payload || 'null') || initialState,
        });
      })
      .catch(console.log)
      .then(() => {
        setLoading(false);
      });
  }, []);

  // TODO: change to prevent re-rendering when fetching 500+ values
  useEffect(() => {
    AsyncStorage.setItem('state', JSON.stringify(state)).catch(() => {});
  }, [state]);

  const value = {
    state,
    dispatch,
  };

  if (loading) {
    return null;
  }
  return (
    <AsyncStorageContext.Provider value={value}>
      {children}
    </AsyncStorageContext.Provider>
  );
};

export default AsyncStorageProvider;
