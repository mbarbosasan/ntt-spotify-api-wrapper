import { Routes } from '@angular/router';
import { authenticatedRouteGuard } from './core/guards/authenticated-route.guard';
import { unauthenticatedRouteGuard } from './core/guards/unauthenticated-route.guard';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [unauthenticatedRouteGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(c => c.DASHBOARD_ROUTES),
    canActivate: [authenticatedRouteGuard]
  }
];
