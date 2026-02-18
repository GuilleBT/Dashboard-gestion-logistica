import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const { error } = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      
      if (error) throw error;
      
      // Si entra correcto, al dashboard
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.errorMessage = 'Credenciales incorrectas o usuario no encontrado.';
    } finally {
      this.isLoading = false;
    }
  }
}