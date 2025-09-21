import { ImageObject } from "../../search/types/search.model";

export type Track = {
  artist: {
    name: string;
    type: 'artist'
  },
  id: string;
  name: string;
  duration_ms: number;
  disc_number: number;
  track_number: number;
  type: 'track'
}

export type Album = {
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  artists: {
    name: string;
    type: 'artist'
  },
  tracks: {
    items: Track[]
  }
}