import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartSidebarService {
  private openCartSubject = new Subject<void>();
  openCart$ = this.openCartSubject.asObservable();

  openCart() {
    this.openCartSubject.next();
  }
}
