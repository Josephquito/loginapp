import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interface/responseAcceso';
import { Login } from '../interface/login';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor() {}

  registrarse(objeto: User): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(
      `${this.baseUrl}/auth/register`,
      objeto
    );
  }

  login(objeto: Login): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/auth/login`, objeto);
  }
}
