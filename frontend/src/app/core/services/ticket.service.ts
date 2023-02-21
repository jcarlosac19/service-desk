import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiOptions,
  CreateTicket,
  TicketGetResponse,
  TicketPostResponse,
} from '../interfaces/ticket.interface';
import { ApiService, JwtService } from './';
import * as helper from '../helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(
    private jwtService: JwtService,
    private postService: ApiService<TicketPostResponse>,
    private getService: ApiService<TicketGetResponse>
  ) {}

  createTicket(request: CreateTicket): Observable<TicketPostResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.postService.post('/tickets', request, { headers });
  }

  getTickets(): Observable<TicketGetResponse[]> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.getService.getAll('/tickets',  new HttpParams(), headers);
  }
}
