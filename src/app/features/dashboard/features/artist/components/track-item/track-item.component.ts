import { NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Track } from '../../types/artist.model';

@Component({
  selector: 'app-track-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './track-item.component.html',
  styleUrl: './track-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackItemComponent {
  track = input.required<Track>();

  trackCover = computed(() => this.track().album.images[0]);
}
