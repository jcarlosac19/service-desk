import { Injectable } from '@angular/core';
import { Department } from '../interfaces/department.interface';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as helper from '../helpers';


@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private jwtService: JwtService, private apiService: ApiService<Department>) { }

  getDepartments(): Observable<Department[]> {
    const token = this.jwtService.getToken();
    if (helper.isNullOrWhitespace(token)) throw new Error('No token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`,
    });

    return this.apiService.getAll('/departamentos', new HttpParams(), headers);
  }

  materializeResponseToDepartments(response: any): Department[] {
    const departments: Department[] = [];
    response.forEach((department: any) => {
      departments.push({
        _id: department._id,
        nombreDepartamento: department.nombreDepartamento,
        descripcion: department.descripcion,
        creador_id: department.creador_id,
        modificador_id: department.modificador_id,
        esta_eliminado: department.esta_eliminado,
      });
    });
    return departments;
  }
}
