import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CookieService {

  get(name: string): string | null {
    const matches = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return matches ? matches.split('=')[1] : null;
  }

  set(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  remove(name: string) {
    document.cookie = name + '=; expires=' + new Date(0).toUTCString() + '; path=/';
  }

}