import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { first, map, switchMap } from 'rxjs';
import { AlbumItemComponent } from "./components/album-item/album-item.component";
import { TrackItemComponent } from "./components/track-item/track-item.component";
import { ArtistService } from './services/artist.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [TrackItemComponent, AlbumItemComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly artistService = inject(ArtistService);

  artistId = this.activatedRoute.params.pipe(
    first(),
    map((params) => params['id'])
  )

  artist = toSignal(
    this.artistId.pipe(
      switchMap((id) => this.artistService.getArtistById(id))
    )
  )

  albums = toSignal(
    this.artistId.pipe(
      switchMap((id) => this.artistService.getAlbumsByArtist(id))
    )
  )

  tracks = toSignal(
    this.artistId.pipe(
      switchMap((id) => this.artistService.getArtistTopTracks(id))
    )
  )

  artistCover = computed(() => this.artist()?.images[0]);
}
