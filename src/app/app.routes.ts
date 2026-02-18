import { Routes } from '@angular/router';

export const routes: Routes = [
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
    loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: '',
    redirectTo: 'login', // Si entran a la raíz, los mandamos al login
    pathMatch: 'full'
  }
];