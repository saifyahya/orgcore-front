import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Page, Product, ProductRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private path = '/products';

  constructor(private api: ApiService) { }

  getAll(): Observable<Page<Product>> {
    return this.api.get<Page<Product>>(this.path);
  }

  getByCategory(categoryId: number): Observable<Product[]> {
    return this.api.get<Product[]>(`${this.path}?categoryId=${categoryId}`);
  }

  getById(id: number): Observable<Product> {
    return this.api.get<Product>(`${this.path}/${id}`);
  }

  create(product: ProductRequest): Observable<Product> {
    return this.api.post<Product>(this.path, product);
  }

  update(id: number, product: ProductRequest): Observable<Product> {
    return this.api.put<Product>(`${this.path}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.path}/${id}`);
  }

  toggleActive(id: number, isActive: number): Observable<Product> {
    return this.api.patch<Product>(`${this.path}/${id}/active`, { isActive });
  }
}
