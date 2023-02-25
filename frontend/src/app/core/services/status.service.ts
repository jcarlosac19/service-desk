import { Injectable } from '@angular/core';
import { StatusCreate, StatusEdit, StatusResponse, MessageResponse } from '../interfaces/status.interface';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as helper from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(
    private jwtService: JwtService,
    private postService: ApiService<MessageResponse>,
    private getService: ApiService<StatusResponse>
  ) {}

  createStatus(request: StatusCreate): Observable<MessageResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.postService.post('/estados', request, { headers });
  }

  getStatuses(): Observable<StatusResponse[]> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.getService.getAll('/estados',  new HttpParams(), headers);
  }

  editStatus(request: StatusEdit): Observable<MessageResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.postService.put(`/estados/${request._id}`, request, { headers });
  }

  deleteStatus(id: string): Observable<MessageResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.postService.delete(`/estados/eliminar/${id}`, { headers });
  }
}
