import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = window.localStorage.getItem('token');

    if (token) {
      return true; // ✅ Permitir acceso si hay token
    }

    this.router.navigate(['/login']); // ❌ Redirigir si NO hay token
    return false;
  }
}
