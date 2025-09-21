import { NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { first, map, switchMap } from 'rxjs';
import { BreadcrumbComponent } from 'src/app/shared/ui/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from 'src/app/shared/ui/breadcrumb/types/breadcrumb.model';
import { AlbumTrackItemComponent } from './components/album-track-item/album-track-item.component';
import { AlbumsService } from './services/albums.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [NgOptimizedImage, AlbumTrackItemComponent, BreadcrumbComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly albumsService = inject(AlbumsService);

  breadcrumb: Signal<BreadcrumbItem[]> = computed(() => {
    if (!this.album()) return [];
    return [
      {
        name: this.album()!.artists[0].name,
        link: `/dashboard/artist/${this.album()!.artists[0].id}`,
      },
      {
        name: this.album()!.name,
        link: `/dashboard/album/${this.album()!.id}`,
      },
    ];
  });

  albumId = this.activatedRoute.params.pipe(
    first(),
    map((params) => params['id'])
  );

  album = toSignal(
    this.albumId.pipe(switchMap((id) => this.albumsService.getAlbum(id)))
  );

  albumCover = computed(() => this.album()?.images[0].url);

  albumReleaseDateFormatted = computed(() => {
    if (!this.album()) return '';
    return new Intl.DateTimeFormat('pt-br', {
      year: 'numeric',
    }).format(new Date(this.album()!.release_date));
  });
}
