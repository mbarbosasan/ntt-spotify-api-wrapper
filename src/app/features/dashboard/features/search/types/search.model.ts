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

export type CommonItemSearch = {
  name: string;
  image: ImageObject | null;
  author: string;
  id: string;
  type: SearchType;
};

export function isTracksSearchResult(result: any): result is TrackSearchResult {
  return (
    result &&
    Array.isArray(result.items) &&
    result.items.length > 0 &&
    'album' in result.items[0]
  );
}

export function toCommonItemSearch(result: SearchResult): CommonItemSearch[] {
  const items: CommonItemSearch[] = [];

  if (result.artists) {
    items.push(
      ...result.artists.items.map((artist) => ({
        name: artist.name,
        image: artist.images[0],
        author: artist.name,
        id: artist.id,
        type: 'artist' as SearchType,
      }))
    );
  }

  if (result.albums) {
    items.push(
      ...result.albums.items.map((album) => ({
        name: album.name,
        image: album.images[0],
        author: album.artists.map((a) => a.name).join(', '),
        id: album.id,
        type: 'album' as SearchType,
      }))
    );
  }

  if (result.tracks) {
    items.push(
      ...result.tracks.items.map((track) => ({
        name: track.name,
        image: track.album.images[0],
        author: track.artists.map((a) => a.name).join(', '),
        id: track.id,
        type: 'track' as SearchType,
      }))
    );
  }

  if (result.playlists) {
    items.push(
      ...result.playlists.items.map((playlist) => ({
        name: playlist.name,
        image: playlist.images[0],
        author: playlist.owner.display_name,
        id: playlist.id,
        type: 'playlist' as SearchType,
      }))
    );
  }

  if (result.shows) {
    items.push(
      ...result.shows.items.map((show) => ({
        name: show.name,
        image: show.images[0],
        author: show.publisher,
        id: show.id,
        type: 'show' as SearchType,
      }))
    );
  }

  if (result.episodes) {
    items.push(
      ...result.episodes.items.map((episode) => ({
        name: episode.name,
        image: episode.images[0],
        author: episode.language,
        id: episode.id,
        type: 'episode' as SearchType,
      }))
    );
  }

  return items;
}
