import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatestWith,
  first,
  map,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { PaginatorComponent } from '../search/components/paginator/paginator.component';
import { AlbumItemComponent } from './components/album-item/album-item.component';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { ArtistService } from './services/artist.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [TrackItemComponent, AlbumItemComponent, PaginatorComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly artistService = inject(ArtistService);

  offset = signal(0);
  limit = signal(6);

  albumsPageChanged = new Subject<{ limit: number; offset: number }>();

  artistId = this.activatedRoute.params.pipe(
    first(),
    map((params) => params['id'])
  );

  artist = toSignal(
    this.artistId.pipe(switchMap((id) => this.artistService.getArtistById(id)))
  );

  albums = toSignal(
    this.albumsPageChanged.pipe(
      startWith({
        limit: this.limit(),
        offset: this.offset(),
      }),
      combineLatestWith(this.artistId),
      switchMap(([{ limit, offset }, id]) =>
        this.artistService.getAlbumsByArtist(id, limit, offset)
      )
    )
  );

  tracks = toSignal(
    this.artistId.pipe(
      switchMap((id) => this.artistService.getArtistTopTracks(id))
    )
  );

  artistCover = computed(() => this.artist()?.images[0]);

  onPageChange({ limit, offset }: { limit: number; offset: number }) {
    this.albumsPageChanged.next({
      limit: limit,
      offset: offset,
    });
  }
}
