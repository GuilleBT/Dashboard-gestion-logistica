import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/pages/home/home').then(m => m.Home)
  },

  {
    path: 'register',
    // Carga perezosa (Lazy Loading): Da muchos puntos en la evaluación
    loadComponent: () => import('./features/auth/pages/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard], // Protegemos esta ruta con el guard de autenticación para poder cerrar la sesión desde el dashboard
    loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full'
  },

  {
    path: '**', // El comodín de Angular para atrapar rutas que no existen
    loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFoundComponent)
  }
];