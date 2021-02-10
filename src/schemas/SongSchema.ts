import {ObjectId} from 'bson';

export type Song = {
  // _id: ObjectId;
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  link: string;
  title: string; // {rendered: 'string'},
  albumId: number; //album
  chordpro: string;
  original: string;
  text: string;
  translation: string;
  bible_ref: string;
  key: string;
  tempo: string;
  capo: string;
  bandcamp: string;
  spotify: string;
  video: string;
};

export const SongSchema = {
  name: 'Song',
  properties: {
    // _id: 'objectId',
    id: 'int',
    date: 'string',
    date_gmt: 'string',
    modified: 'string',
    modified_gmt: 'string',
    link: 'string',
    title: 'string', // {rendered: 'string'},
    albumId: 'int', //album
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
  primaryKey: 'id',
};
