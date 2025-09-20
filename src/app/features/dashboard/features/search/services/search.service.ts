import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map } from 'rxjs';
import { SPOTIFY_API_URL } from "../../../../../constants";
import {
  SearchResult,
  SearchType,
  toCommonItemSearch,
} from '../types/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);
  search(query: string, types: SearchType[], limit: number, offset: number) {
    return this.http
      .get<SearchResult>(`${SPOTIFY_API_URL}/search`, {
        params: {
          q: query,
          type: types.join(','),
          limit,
          offset,
        },
      })
      .pipe(map((result) => toCommonItemSearch(result, limit, offset)));
  }
}