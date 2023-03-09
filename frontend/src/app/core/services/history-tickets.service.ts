import { Injectable } from '@angular/core';
import { HistoryResponse } from '../interfaces/ticket.interface';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as helper from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class HistoryTicketsService {

  constructor(private jwtService: JwtService, private apiService: ApiService<HistoryResponse>) { }

  getHistoryByTicket(ticket: number) :Observable<HistoryResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.apiService.get(`/historico/${ticket}`, new HttpParams(), headers);
  }
}
