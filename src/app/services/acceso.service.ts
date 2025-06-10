import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interface/responseAcceso';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl = appsettings.apiUrl;
  constructor() {}
  registrarse(objeto: User): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(
      `${this.baseUrl}/registrarse`,
      objeto
    );
  }
  login(objeto: Login): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/login`, objeto);
  }
}
