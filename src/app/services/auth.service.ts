import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded;
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
