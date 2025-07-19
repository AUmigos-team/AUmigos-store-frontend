import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Newsletter } from '../interfaces/newsletter';
import { Observable } from 'rxjs';
import {environment} from '../../../enviroments/enviroment.prod';

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  private baseUrl = `${environment.apiUrl}/news`;
  constructor(private http: HttpClient) {}

  subscribe(payload: Newsletter): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.baseUrl, payload);
  }
}
