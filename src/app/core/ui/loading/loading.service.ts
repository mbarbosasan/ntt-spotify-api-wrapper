import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  show = signal(false)

  setLoading(loading: boolean) {
    this.show.set(loading)
  }
}