import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Newsletter } from '../interfaces/newsletter';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  constructor(private http: HttpClient) {}

  subscribe(payload: Newsletter): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>('/api/news', payload);
  }
}
