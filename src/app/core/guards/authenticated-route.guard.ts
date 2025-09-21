import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

export const authenticatedRouteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  return authService.token$.pipe(
    map(token => {
      if (!token) {
        return router.createUrlTree(['/login'])
      };
      if (token.isExpired()) {
        toastService.show({title: 'Sessão expirada', message: 'Sua sessão expirou, faça login novamente.'})
        return router.createUrlTree(['/login'])
      }
      return true;
    }),
  )
};
