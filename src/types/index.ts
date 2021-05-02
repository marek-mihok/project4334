export type Song = {
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

export type Album = {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  link: string;
  title: string; // {rendered: 'string'},
  featured_media: number;
  artistId: number; //artist
  imageInfoUrl: string; // {'wp:attachment': {href: 'string'}}, // TODO: odtial stiahnut media_details
};
