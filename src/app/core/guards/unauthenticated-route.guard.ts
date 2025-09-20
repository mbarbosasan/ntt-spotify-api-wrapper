import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

export const unauthenticatedRouteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.token$.pipe(
    map(token => {
      if (!token) return true;
      if (!token.isExpired()) return router.createUrlTree(['/dashboard']);
      return true;
    }),
  )
};
