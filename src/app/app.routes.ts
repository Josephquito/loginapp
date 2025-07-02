import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { FinanzasComponent } from './pages/finanzas/finanzas.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'cuentas',
    component: CuentasComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }, // por ejemplo
  },
  {
    path: 'finanzas',
    component: FinanzasComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }, // o ambos si lo deseas
  },
  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '**', redirectTo: 'login' },
];
