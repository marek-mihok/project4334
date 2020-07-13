import AsyncStorage from '@react-native-community/async-storage';
import produce from 'immer';
import React, {FunctionComponent, useEffect, useState} from 'react';

type StorageState = {
  songs: {[id: string]: string};
  albums: {[id: string]: string};
  artists: {[id: string]: string};
};

const LOAD_STATE = 'LOAD_STATE';
export const SET_SONG = 'SET_SONG';
export const SET_ALBUM = 'SET_ALBUM';
export const SET_ARTIST = 'SET_ARTIST';

type ActionType =
  | {
      type: typeof LOAD_STATE;
      payload: StorageState;
    }
  | {
      type: typeof SET_SONG;
      payload: {
        songId: string;
        song: string;
      };
    }
  | {
      type: typeof SET_ALBUM;
      payload: {
        albumId: string;
        album: string;
      };
    }
  | {
      type: typeof SET_ARTIST;
      payload: {
        artistId: string;
        artist: string;
      };
    };

const reducer = (state: StorageState, action: ActionType) => {
  switch (action.type) {
    case LOAD_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SONG:
      return produce(state, draftState => {
        draftState.songs[action.payload.songId] = action.payload.song;
      });
    case SET_ALBUM:
      return produce(state, draftState => {
        draftState.albums[action.payload.albumId] = action.payload.album;
      });
    case SET_ARTIST:
      return produce(state, draftState => {
        draftState.artists[action.payload.artistId] = action.payload.artist;
      });
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

const initialState = {
  songs: {},
  albums: {},
  artists: {},
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
