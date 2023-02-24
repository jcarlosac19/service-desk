import { Injectable } from '@angular/core';
import { GroupResponse } from '../interfaces/group.interface';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as helper from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private jwtService: JwtService,
    //private postService: ApiService<TicketPostResponse>,
    private getService: ApiService<GroupResponse>
  ) {}

  // createTicket(request: CreateTicket): Observable<TicketPostResponse> {
  //   const token = this.jwtService.getToken();
  //   if (helper.isNullOrWhitespace(token)) throw new Error('No token');
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'x-access-token': `${token}`,
  //   });

  //   return this.postService.post('/tickets', request, { headers });
  // }

  getGroups(): Observable<GroupResponse[]> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.getService.getAll('/grupos',  new HttpParams(), headers);
  }
}
