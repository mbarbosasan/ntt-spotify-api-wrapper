import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthToken } from 'src/app/core/domain/auth/auth-token.';
import { CookieService } from 'src/app/core/services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly token = new BehaviorSubject<AuthToken | null>(null);
  private readonly cookieService = inject(CookieService);
  token$ = this.token.asObservable();

  updateToken(token: AuthToken) {
    this.token.next(token);
    if (this.cookieService.get('Authorization')) return;
    this.cookieService.set(
      'Authorization',
      JSON.stringify(token),
      token.should_expire_at
    );
  }
}
