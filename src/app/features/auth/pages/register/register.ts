import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth'; // Asegúrate de que la ruta coincida con tu archivo

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html', // Verifica que el nombre de tu html sea este
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Variable para el Loader y el mensaje de error
  isLoading = false;
  errorMessage = '';

  // Definición del formulario con las validaciones estrictas de la rúbrica
  registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordsMatchValidator });

  // Validador personalizado: comprueba que las contraseñas sean idénticas
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    const { email, password } = this.registerForm.value;

    try {
      const { data, error } = await this.authService.register(email, password);
      
      if (error) throw error;
      
      // Check de la rúbrica: Redirigir al dashboard tras registro exitoso
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.errorMessage = err.message || 'Error al registrar el usuario';
    } finally {
      this.isLoading = false;
    }
  }
}