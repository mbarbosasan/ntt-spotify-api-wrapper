import { ImageObject } from "../../search/types/search.model";

export type Artist = {
  id: string;
  name: string;
  type: 'artist',
  popularity: number;
  genres: string[];
  followers: {
    href: null,
    total: number;
  },
  images: ImageObject[]
}

export type AlbumsResponse = {
  limit: number;
  offset: number;
  total: number;
  items: Album[]
}

export type Album = {
  id: string;
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  href: string;
  name: string;
  release_date: string;
  type: 'album';
  images: ImageObject[]
}

export type Track = {
  id: string;
  name: string;
  type: 'track';
  album: Album;
}