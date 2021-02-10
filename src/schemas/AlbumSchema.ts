export type Album = {
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

export const AlbumSchema: Realm.ObjectSchema = {
  name: 'Album',
  properties: {
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
  primaryKey: 'id',
};
