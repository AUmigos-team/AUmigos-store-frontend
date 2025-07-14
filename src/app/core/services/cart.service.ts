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

  addProduct(productId: number, quantity: number = 1) {
    return this.http.post(`/api/cart/add`, { productId, quantity });
  }

  removeProduct(productId: number, quantity: number = 1) {
    return this.http.request('delete', `/api/cart/remove`, {
      body: { productId, quantity }
    });
  }
}
