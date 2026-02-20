import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';


// Verifica que el usuario logueado sea ADMIN.

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const user = authService.currentUser();

  if (user && user.role === 'ADMIN') {
    return true; // Pasa el admin
  } else {
    alert('Acceso denegado. Se requieren permisos de Administrador.');
    return false; // Bloquea al usuario normal
  }
};