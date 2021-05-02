import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {Album, AlbumSchema} from '../schemas/AlbumSchema';
import {Artist, ArtistSchema} from '../schemas/ArtistSchema';
import {Song, SongSchema} from '../schemas/SongSchema';

type SongProviderContext = {
  createSong: (song: Song) => void;
  songs: Song[];
  createAlbum: (album: Album) => void;
  albums: Album[];
  createArtist: (artist: Artist) => void;
  artists: Artist[];
};

const SongsContext = React.createContext<SongProviderContext | null>(null);

const SongsProvider: React.FC = ({children}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  console.log('SongProvider re-rendered.');

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef<Realm | null>(new Realm()); // TODO

  useEffect(() => {
    const config: Realm.Configuration = {
      schema: [SongSchema, AlbumSchema, ArtistSchema],
      // path: './myrealm/data',
    };
    // open a realm for this particular project
    // Realm.open(config).then(projectRealm => {
    let projectRealm: Realm = new Realm(config);
    realmRef.current = projectRealm;

    const songsDB: Realm.Results<Song> = projectRealm.objects('Song');
    console.log('SONGS DB:', songsDB);
    let sortedSongs = songsDB.sorted('id');
    setSongs([...sortedSongs]);
    sortedSongs.addListener(() => {
      setSongs([...sortedSongs]);
    });

    // const albumsDB: Realm.Results<Album> = projectRealm.objects('Album');
    // let sortedAlbums = albumsDB.sorted('id');
    // setAlbums([...sortedAlbums]);
    // sortedAlbums.addListener(() => {
    //   setAlbums([...sortedAlbums]);
    // });

    // const artistsDB: Realm.Results<Artist> = projectRealm.objects('Artist');
    // let sortedArtists = artistsDB.sorted('id');
    // setArtists([...sortedArtists]);
    // sortedArtists.addListener(() => {
    //   setArtists([...sortedArtists]);
    // });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setSongs([]);
        // setAlbums([]);
        // setArtists([]);
      }
    };
  }, []);





  const createSong = (song: Song) => {
    let obj = realmRef.current?.objectForPrimaryKey('Song', song.id); // kvoli  realmRef.current?.objectForPrimaryKey('Song', song.id); nefunguje auto-formatting
    if (obj !== undefined) {
      console.log('object with id ' + song.id + ' already found in DB.');
      return;
    }
    

    const projectRealm = realmRef.current;
    if (projectRealm) {
      console.log('adding song with id ' + song.id + ' to DB.');
      projectRealm.write(() => {
        projectRealm.create('Song', song);
      });
    }
  };

  const createAlbum = (album: Album) => {
    let obj = realmRef.current?.objectForPrimaryKey('Album', album.id); // kvoli  realmRef.current?.objectForPrimaryKey('Song', song.id); nefunguje auto-formatting
    if (obj !== undefined) {
      console.log('Album object with id ' + album.id + ' already found in DB.');
      return;
    }
    

    const projectRealm = realmRef.current;
    if (projectRealm) {
      console.log('adding album with id ' + album.id + ' to DB.');
      projectRealm.write(() => {
        projectRealm.create('Album', album);
      });
    }
  };

  const createArtist = (artist: Artist) => {
    let obj = realmRef.current?.objectForPrimaryKey('Artist', artist.id); // kvoli  realmRef.current?.objectForPrimaryKey('Song', song.id); nefunguje auto-formatting
    if (obj !== undefined) {
      console.log('Artist object with id ' + artist.id + ' already found in DB.');
      return;
    }
    

    const projectRealm = realmRef.current;
    if (projectRealm) {
      console.log('adding artist with id ' + artist.id + ' to DB.');
      projectRealm.write(() => {
        projectRealm.create('Artist', artist);
      });
    }
  };

  const value = {
    createSong,
    songs,
    createAlbum,
    albums,
    createArtist,
    artists
  };

  return (
    <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
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
