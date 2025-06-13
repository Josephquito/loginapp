import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../interface/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accesoService = inject(AccesoService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  public formRegister: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  registrarse() {
    if (this.formRegister.invalid) return;

    const newUser: User = this.formRegister.value;

    this.accesoService.registrarse(newUser).subscribe({
      next: (data) => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar el usuario:', error);
        alert('Error al registrarse');
      },
    });
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
