import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  // Lo hacemos público para usarlo en el HTML
  public authService = inject(AuthService);

  async logout() {
    await this.authService.logout();
    // Redirigimos manualmente al home o login recargando la ruta
    window.location.href = '/login'; 
  }
}