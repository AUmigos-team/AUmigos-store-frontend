import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Cart} from '../interfaces/cart/cart';
import {environment} from '../../../enviroments/enviroment.prod';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = `${environment.apiUrl}/cart`;
  private cartId: number | null = null;

  constructor(private http: HttpClient) {}


  getCart(): Observable<{ cart: Cart }> {
    return this.http.get<{ cart: Cart }>('/api/cart').pipe(
      tap((res) => {
        this.cartId = res.cart.id;
      })
    );
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
