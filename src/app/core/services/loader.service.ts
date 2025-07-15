import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private lastShowTime = 0;

  show() {
    this.lastShowTime = Date.now();
    this.loadingSubject.next(true);
  }

  hide(minDuration = 300) {
    const elapsed = Date.now() - this.lastShowTime;
    const remaining = minDuration - elapsed;

    if (remaining > 0) {
      setTimeout(() => this.loadingSubject.next(false), remaining);
    } else {
      this.loadingSubject.next(false);
    }
  }
}
