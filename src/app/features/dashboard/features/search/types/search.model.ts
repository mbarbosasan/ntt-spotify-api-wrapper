export type SearchType =
  | 'artist'
  | 'album'
  | 'track'
  | 'playlist'
  | 'show'
  | 'episode';

export type BaseSearchResult<T> = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Array<T>;
};

type ImageObject = {
  url: string;
  height: string | null;
  width: string | null;
};

type RestrictionObject = {
  reason: 'market' | 'product' | 'explicit';
};

export type TrackSearchResult = {
  album: {
    album_type: string;
    total_tracks: number;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    restrictions: RestrictionObject;
  };
  artists: Array<{
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
  }>;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: 'track';
  restrictions: RestrictionObject;
};

export type ArtistSearchResult = {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  genres: string[];
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
};

export type AlbumSearchResult = {
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  restrictions: RestrictionObject;
  type: 'album';
  uri: string;
  artists: ArtistSearchResult[];
};

export type PlaylistSearchResult = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  owner: {
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: 'playlist';
  uri: string;
};

export type EpisodeSearchResult = {
  audio_preview_url: string | null;
  descrpition: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  language: string;
  name: string;
  release_date: string;
  type: 'episode';
  uri: string;
  restrictions: RestrictionObject;
};

export type ShowSearchResult = {
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
  total_episodes: number;
};

export type SearchResult = {
  artists?: BaseSearchResult<ArtistSearchResult>;
  albums?: BaseSearchResult<AlbumSearchResult>;
  tracks?: BaseSearchResult<TrackSearchResult>;
  playlists?: BaseSearchResult<PlaylistSearchResult>;
  shows?: BaseSearchResult<ShowSearchResult>;
  episodes?: BaseSearchResult<EpisodeSearchResult>;
};

export function isTracksSearchResult(result: any): result is TrackSearchResult {
  return (
    result &&
    Array.isArray(result.items) &&
    result.items.length > 0 &&
    'album' in result.items[0]
  );
}
