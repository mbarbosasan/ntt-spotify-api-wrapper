import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthToken } from './core/domain/auth/auth-token.';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';
import { CookieService } from './core/services/cookie.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const authService = inject(AuthService);
        const cookieService = inject(CookieService);
        return () => {
          const token = AuthToken.fromJson(cookieService.get('Authorization'));
          if (!token) return;
          authService.updateToken(token);
        };
      },
      multi: true,
    },
  ],
};
