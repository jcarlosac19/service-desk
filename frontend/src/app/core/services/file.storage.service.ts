import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as helper from '../helpers';
import { environment } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class FileStorageServices {
    
  constructor(
    private jwtService: JwtService,
    private postService: ApiService<any>,
    private getService: ApiService<any>,
    private http:HttpClient
    ) { }
  
  uploadFile(ticketId: Number, file: any):Observable<any> {

    const token = this.jwtService.getToken();
    let formData = new FormData(); 

    formData.append('file', file, file.name);
    formData.append('ticket','11');

    if (helper.isNullOrWhitespace(token)) throw new Error('No token');

    const headers = new HttpHeaders({
        'x-access-token': `${token}`,
        'Content-Type': 'multipart/form-data'
      });

    return this.http.post('http://localhost:3000/archivos', formData, { headers })
  }
}