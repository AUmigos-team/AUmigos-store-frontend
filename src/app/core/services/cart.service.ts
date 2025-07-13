import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../interfaces/cart/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = '/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<{ cart: Cart }> {
    return this.http.get<{ cart: Cart }>(`/api/cart`);
  }

  addProduct(productId: number): Observable<void> {
    return this.http.post<void>(`${this.api}/add`, { productId });
  }

  removeProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/remove`, {
      body: { productId }
    });
  }

}
