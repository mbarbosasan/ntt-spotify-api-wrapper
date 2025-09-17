import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  get(name: string): string | null {
    const matches = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='));
    return matches ? matches.split('=')[1] : null;
  }

  set(name: string, value: string, expiresIn: string) {
    const expires = `expires=${new Date(expiresIn).toUTCString()}`;
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  remove(name: string) {
    document.cookie =
      name + '=; expires=' + new Date(0).toUTCString() + '; path=/';
  }
}