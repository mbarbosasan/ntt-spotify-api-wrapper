import { Component, input } from '@angular/core';
import {
  AlbumSearchResult,
  ArtistSearchResult,
  BaseSearchResult,
  EpisodeSearchResult,
  PlaylistSearchResult,
  ShowSearchResult,
  TrackSearchResult
} from '../../types/search.model';
import { TrackItemComponent } from "../track-item/track-item.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TrackItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  list = input.required<
    | BaseSearchResult<TrackSearchResult>
    | BaseSearchResult<ArtistSearchResult>
    | BaseSearchResult<AlbumSearchResult>
    | BaseSearchResult<PlaylistSearchResult>
    | BaseSearchResult<EpisodeSearchResult>
    | BaseSearchResult<ShowSearchResult>
  >();
  title = input.required<string>();
}
