import { Injectable } from "@angular/core";
import { first, Subject, timer } from "rxjs";
import { ToastMessage } from "./models/toast.model";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  protected readonly toast = new Subject<ToastMessage | null>();
  life = 5_000;
  toasts$ = this.toast.asObservable();

  show(message: ToastMessage) {
    this.toast.next(message);
    
    timer(this.life).pipe(
      first()
    ).subscribe(() => this.toast.next(null))
  }

}