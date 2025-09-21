import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/search/search.component').then(
            (c) => c.SearchComponent
          ),
      },
      {
        path: 'artist/:id',
        loadComponent: () =>
          import('./features/artist/artist.component').then(
            (c) => c.ArtistComponent
          ),
      },
      {
        path: 'album/:id',
        loadComponent: () =>
          import('./features/albums/albums.component').then(
            (c) => c.AlbumsComponent
          ),
      },
    ],
  },
];