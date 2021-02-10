import {ObjectId} from 'bson';

export type Album = {
  _id: ObjectId;
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  link: string;
  title: string; // {rendered: 'string'},
  featured_media: number;
  artistId: string; //artist
  _links: string; // {'wp:attachment': {href: 'string'}}, // TODO: odtial stiahnut guid: {rendered: 'string}
};

export const AlbumSchema = {
  name: 'Album',
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
    artistId: 'string', //artist
    _links: 'string', // {'wp:attachment': {href: 'string'}}, // TODO: odtial stiahnut guid: {rendered: 'string}
  },
  primaryKey: '_id',
};
