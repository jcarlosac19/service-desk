import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateTicket,
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
    private postService: ApiService<TicketPostResponse>
  ) {}

  createTicket(request: CreateTicket): Observable<TicketPostResponse> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrUndefined(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.postService.post('/tickets', request, { headers });
  }
}
