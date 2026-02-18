import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Necesario para que los modales y tablas de PrimeNG se animen bien
    provideAnimationsAsync(),
    // Configuracion moderna de PrimeNG
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ]
};