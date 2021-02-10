import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {AlbumSchema} from '../schemas/AlbumSchema';
import {ArtistSchema} from '../schemas/ArtistSchema';
import {SongSchema} from '../schemas/SongSchema';

const SongsContext = React.createContext(null);

const SongsProvider = ({children}) => {
  const [songs, setSongs] = useState([]);

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    const config = {
      schema: [SongSchema, AlbumSchema, ArtistSchema],
      // path: './myrealm/data',
    };
    // open a realm for this particular project
    // Realm.open(config).then(projectRealm => {
    let projectRealm = new Realm(config);
    realmRef.current = projectRealm;

    const songs = projectRealm.objects('Song');
    let sortedSongs = songs.sorted('id');
    setSongs([...songs]);
    sortedSongs.addListener(() => {
      setSongs([...sortedSongs]);
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setSongs([]);
      }
    };
  }, []);

  const createSong = (song: Song) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create('Song', song);
    });
  };

  return (
    <SongsContext.Provider
      value={{
        createSong,
        songs,
      }}>
      {children}
    </SongsContext.Provider>
  );
};

const useSongs = () => {
  const song = useContext(SongsContext);
  if (song == null) {
    throw new Error('useSongs() called outside of a SongsProvider');
  }
  return song;
};

export {SongsProvider, useSongs};
