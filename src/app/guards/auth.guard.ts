import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

    const expectedRoles = route.data['roles'] as string[] | undefined;

    // Si no se especifican roles, solo se requiere estar logueado
    if (!expectedRoles || expectedRoles.includes(user.role)) {
      return true;
    }

    // Si el rol del usuario no está autorizado
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
