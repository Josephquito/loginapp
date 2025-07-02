import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service'; // ajusta según ruta

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.auth.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data['role'];

    if (!expectedRole || user.role === expectedRole) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
