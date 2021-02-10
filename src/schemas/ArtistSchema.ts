import {ObjectId} from 'bson';

export type Artist = {
  _id: ObjectId;
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  link: string;
  title: string; // {rendered: 'string'},
  featured_media: number;
  content: string; // {rendered: 'string'},
};

export const ArtistSchema = {
  name: 'Artist',
  properties: {
    _id: 'objectId',
    id: 'int',
    date: 'string',
    date_gmt: 'string',
    modified: 'string',
    modified_gmt: 'string',
    link: 'string',
    title: 'string', // {rendered: 'string'},
    featured_media: 'int',
    content: 'string', // {rendered: 'string'},
  },
  primaryKey: '_id',
};
