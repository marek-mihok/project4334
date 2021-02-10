export type Artist = {
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

export const ArtistSchema: Realm.ObjectSchema = {
  name: 'Artist',
  properties: {
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
  primaryKey: 'id',
};
