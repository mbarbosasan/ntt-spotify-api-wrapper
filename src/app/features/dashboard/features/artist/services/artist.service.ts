import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map } from "rxjs";
import { SPOTIFY_API_URL } from "src/app/constants";
import { AlbumsResponse, Artist, Track } from "src/app/features/dashboard/features/artist/types/artist.model";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly http = inject(HttpClient);

  getArtistById(id: string) {
    return this.http.get<Artist>(`${SPOTIFY_API_URL}/artists/${id}`)
  }

  getArtistTopTracks(id: string) {
    return this.http.get<{tracks: Track[]}>(`${SPOTIFY_API_URL}/artists/${id}/top-tracks`).pipe(
      map((response) => response.tracks)
    )
  }

  getAlbumsByArtist(id: string) {
    return this.http.get<AlbumsResponse>(`${SPOTIFY_API_URL}/artists/${id}/albums`)
  }
}