import { Injectable } from '@angular/core';
import { HistoryResponse } from '../interfaces/ticket.interface';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as helper from '../helpers';
import { MessageResponse } from '../interfaces/status.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryTicketsService {
  constructor(
    private jwtService: JwtService,
    private apiService: ApiService<HistoryResponse>,
    private postService: ApiService<MessageResponse>
  ) {}

  getHistoryByTicket(ticket: number): Observable<HistoryResponse[]> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.apiService.getAll(
      `/historico/${ticket}`,
      new HttpParams(),
      headers
    );
  }

  updateHistory(request: Object = {}): Observable<MessageResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.postService.post(`/historico`, request, { headers });
  }
}
