import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SPOTIFY_AUTH_URL } from '../../../constants';
import { AuthToken } from '../../../core/domain/auth.model';
import { LoginCommand } from '../types/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);

  login({ clientId, clientSecret }: LoginCommand) {
    return this.http.post<AuthToken>(`${SPOTIFY_AUTH_URL}/token`, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}
