import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth'; // Revisa que la ruta sea correcta a tu auth.ts

/**
 * Guard que protege las rutas privadas.
 * Solo permite el paso si el usuario tiene una sesión activa en Supabase.
 */
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Le preguntamos a Supabase si hay una sesión válida guardada
  const { data } = await authService['supabase'].auth.getSession();

  if (data.session) {
    return true; // Puerta abierta
  } else {
    // Puerta cerrada: patada al login
    router.navigate(['/login']);
    return false;
  }
};