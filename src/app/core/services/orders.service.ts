import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Order} from '../interfaces/order';
import {environment} from '../../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly API = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) {}

  getOrders(page = 0, size = 5): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API}?page=${page}&size=${size}`);
  }
}
