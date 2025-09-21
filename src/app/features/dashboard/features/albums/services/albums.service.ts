import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SPOTIFY_API_URL } from "src/app/constants";
import { Album } from "../types/albums.model";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private readonly http = inject(HttpClient);

  getAlbum(id: string) {
    return this.http.get<Album>(`${SPOTIFY_API_URL}/albums/${id}`)
  }
}