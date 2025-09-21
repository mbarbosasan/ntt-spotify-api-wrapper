import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MilisToMinutesPipe } from '../../pipes/milis-to-minutes.pipe';
import { Track } from '../../types/albums.model';

@Component({
  selector: 'app-album-track-item',
  standalone: true,
  imports: [MilisToMinutesPipe],
  templateUrl: './album-track-item.component.html',
  styleUrl: './album-track-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumTrackItemComponent {
  track = input.required<Track>();
}
