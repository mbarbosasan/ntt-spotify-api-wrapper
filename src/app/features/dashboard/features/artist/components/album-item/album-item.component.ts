import { NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Album } from 'src/app/features/dashboard/features/artist/types/artist.model';

@Component({
  selector: 'app-album-item',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './album-item.component.html',
  styleUrl: './album-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumItemComponent {
  album = input.required<Album>();
  albumCover = computed(() => this.album().images[0]);
  releaseDateFormatted = computed(() =>
    new Intl.DateTimeFormat('pt-br', {
      year: 'numeric',
    }).format(new Date(this.album().release_date))
  );
}
