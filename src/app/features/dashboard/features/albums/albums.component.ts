import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { first, map, switchMap } from 'rxjs';
import { AlbumTrackItemComponent } from "./components/album-track-item/album-track-item.component";
import { AlbumsService } from './services/albums.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [NgOptimizedImage, AlbumTrackItemComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly albumsService = inject(AlbumsService);

  albumId = this.activatedRoute.params.pipe(
    first(),
    map(params => params['id'])
  )

  album = toSignal(this.albumId.pipe(
    switchMap((id) => this.albumsService.getAlbum(id))
  ))

  albumCover = computed(() => this.album()?.images[0].url)
  
  albumReleaseDateFormatted = computed(() => {
    if (!this.album()) return '';
    return new Intl.DateTimeFormat('pt-br', {
      year: 'numeric'
    }).format(new Date(this.album()!.release_date))
  })
}
