import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { AuthToken } from './core/models/auth/auth-token.';
import { AuthService } from './core/services/auth.service';
import { CookieService } from './shared/services/cookie.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, loadingInterceptor, errorInterceptor])
    ),
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
