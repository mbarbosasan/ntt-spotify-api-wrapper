import { NgOptimizedImage } from "@angular/common";
import { Component, computed, input } from '@angular/core';
import { Album } from 'src/app/features/dashboard/features/artist/types/artist.model';

@Component({
  selector: 'app-album-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './album-item.component.html',
  styleUrl: './album-item.component.scss'
})
export class AlbumItemComponent {
  album = input.required<Album>()
  albumCover = computed(() => this.album().images[0])
}
