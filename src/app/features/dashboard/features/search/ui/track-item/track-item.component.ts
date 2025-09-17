import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { TrackSearchResult } from '../../types/search.model';

@Component({
  selector: 'app-track-item',
  standalone: true,
  imports: [JsonPipe, NgOptimizedImage],
  templateUrl: './track-item.component.html',
  styleUrl: './track-item.component.scss'
})
export class TrackItemComponent {
  track = input.required<TrackSearchResult>();
}
