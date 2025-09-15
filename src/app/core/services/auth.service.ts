import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, startWith } from 'rxjs';
import { AuthToken } from '../domain/auth/auth-token.';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly token = new BehaviorSubject<AuthToken | null>(null);
  private readonly cookieService = inject(CookieService);
  token$ = this.token
    .asObservable()
    .pipe(
      startWith(AuthToken.fromJson(this.cookieService.get('Authorization')))
    );

  updateToken(token: AuthToken) {
    this.token.next(token);
    this.cookieService.set(
      'Authorization',
      JSON.stringify(token),
      token.expires_in / 3600
    );
  }
}
