import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { first, map, switchMap } from 'rxjs';
import { SPOTIFY_API_URL } from 'src/app/constants';
import { AuthToken } from 'src/app/core/models/auth/auth-token.';
import { AuthService } from 'src/app/core/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(SPOTIFY_API_URL)) return next(req);

  const authService = inject(AuthService);

  return authService.token$.pipe(
    first(),
    map((token) => (token ? new AuthToken(token) : null)),
    switchMap((token) => {
      if (!token || token.isExpired()) return next(req);
      const { token_type, access_token } = token;
      const newReq = req.clone({
        setHeaders: {
          Authorization: `${token_type} ${access_token}`,
        },
      });
      return next(newReq);
    })
  );
};
