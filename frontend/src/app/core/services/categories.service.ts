import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse, CategoryCreate, CategoryEdit } from '../interfaces/categories.interface';
import { MessageResponse } from '../interfaces/status.interface';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as helper from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private jwtService: JwtService,
    private postService: ApiService<MessageResponse>,
    private getService: ApiService<CategoriesResponse>
  ) {}

  createCategory(request: CategoryCreate): Observable<MessageResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.postService.post('/categorias', request, { headers });
  }

  getCategories(): Observable<CategoriesResponse[]> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.getService.getAll('/categorias',  new HttpParams(), headers);
  }

  editCategory(request: CategoryEdit): Observable<CategoriesResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.getService.put(`/categorias/${request._id}`, request, { headers });
  }

  deleteCategory(id: string): Observable<CategoriesResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.getService.delete(`/categorias/eliminar/${id}`, { headers });
  }
}
