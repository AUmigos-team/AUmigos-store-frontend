import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand} from '../interfaces/band';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private api = '/api/products/brands';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.api);
  }
}
