import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateTicket,
  TicketPostResponse,
  TicketResponse,
} from '../interfaces/ticket.interface';
import { ApiService, JwtService } from './';
import * as helper from '../helpers';
import { Observable } from 'rxjs';
import { CommentResponse } from '../interfaces/comentarios.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(
    private jwtService: JwtService,
    private postService: ApiService<TicketPostResponse>,
    private getService: ApiService<TicketResponse>,
    private getCommentService: ApiService<CommentResponse>
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

  getTickets(): Observable<TicketResponse[]> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.getService.getAll('/tickets-by-user',  new HttpParams(), headers);
  }

  getTicketById(ticketId: number): Observable<TicketResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });
    return this.getService.get(`/tickets/${ticketId}`,  new HttpParams(), headers);
  }

  getTicketCommentById(ticketId: number): Observable<CommentResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });
    return this.getCommentService.get(`/comentarios/${ticketId}`,  new HttpParams(), headers);
  }


}
