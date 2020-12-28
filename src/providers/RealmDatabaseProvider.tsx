import Realm from 'realm';

// Define your models and their properties
const SongSchema = {
  name: 'Song',
  properties: {
    id: 'number',
    date: 'string',
    date_gmt: 'string',
    modified: 'string',
    modified_gmt: 'string',
    link: 'string',
    title: 'string', // {rendered: 'string'},
    albumId: 'number', //album
    chordpro: 'string',
    original: 'string',
    text: 'string',
    translation: 'string',
    bible_ref: 'string',
    key: 'string',
    tempo: 'string',
    capo: 'string',
    bandcamp: 'string',
    spotify: 'string',
    video: 'string',
  },
};
const AlbumSchema = {
  name: 'Album',
  properties: {
    id: 'number',
    date: 'string',
    date_gmt: 'string',
    modified: 'string',
    modified_gmt: 'string',
    link: 'string',
    title: 'string', // {rendered: 'string'},
    featured_media: 'number',
    artistId: 'string', //artist
    _links: 'string', // {'wp:attachment': {href: 'string'}}, // TODO: odtial stiahnut guid: {rendered: 'string}
  },
};

const ArtistSchema = {
  name: 'Artist',
  properties: {
    id: 'number',
    date: 'string',
    date_gmt: 'string',
    modified: 'string',
    modified_gmt: 'string',
    link: 'string',
    title: 'string', // {rendered: 'string'},
    featured_media: 'number',
    content: 'string', // {rendered: 'string'},
  },
};

Realm.open({schema: [SongSchema, AlbumSchema, ArtistSchema]})
  .then(realm => {
    // Create Realm objects and write to local storage
    realm.write(() => {
      const myCar = realm.create('Car', {
        make: 'Honda',
        model: 'Civic',
        miles: 1000,
      });
      myCar.miles += 20; // Update a property value
    });

    // Query Realm for all cars with a high mileage
    const cars = realm.objects('Car').filtered('miles > 1000');

    // Will return a Results object with our 1 car
    cars.length; // => 1

    // Add another car
    realm.write(() => {
      const myCar = realm.create('Car', {
        make: 'Ford',
        model: 'Focus',
        miles: 2000,
      });
    });

    // Query results are updated in realtime
    cars.length; // => 2

    // Remember to close the realm when finished.
    realm.close();
  })
  .catch(error => {
    console.log(error);
  });
