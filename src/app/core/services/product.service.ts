import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaginatedResponse } from '../interfaces/paginated-response.interface';
import {Product} from '../interfaces/product';
import {environment} from '../../../enviroments/enviroment.prod';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getRecommendedProducts(): Observable<PaginatedResponse<Product>> {
    return this.getProducts({ size: 4, page: 0 });
  }

  getProducts(params: any): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(this.baseUrl, { params });
  }
}
