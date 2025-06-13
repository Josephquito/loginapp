import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from '../../interface/login';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  loginSesion() {
    if (this.formLogin.invalid) return;

    const objeto: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };
    console.log('Login enviado:', objeto);

    this.accesoService.login(objeto).subscribe({
      next: (data) => {
        console.log('Respuesta del backend:', data);
        if (data && data.token) {
          localStorage.setItem('token', data.token);
          setTimeout(() => {
            console.log('Token guardado. Redirigiendo al home...');
            this.router.navigate(['/home']);
          }, 100);
        } else {
          alert('Correo o clave incorrectas');
        }
      },
      error: (error) => {
        console.log('Error del backend:', error);
        alert(error.error.message || 'Error inesperado');
      },
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
