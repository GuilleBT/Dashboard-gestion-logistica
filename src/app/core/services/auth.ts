import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export type Role = 'ADMIN' | 'USER' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;

  // Controla si hay usuario y qué rol tiene
  currentUser = signal<{ email: string; role: Role } | null>(null);

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.publicKey);
    this.recuperarSesion();
  }

  // Comprueba si ya estábamos logueados al recargar la página
  private async recuperarSesion() {
    const { data } = await this.supabase.auth.getSession();
    if (data.session?.user?.email) {
      this.establecerUsuario(data.session.user.email);
    }
  }

  // Lógica de roles 
  private establecerUsuario(email: string) {
    const role: Role = email === 'admin@nexus.com' ? 'ADMIN' : 'USER';
    this.currentUser.set({ email, role });
  }

  async register(email: string, pass: string) {
    const res = await this.supabase.auth.signUp({ email, password: pass });
    if (res.data.user?.email) this.establecerUsuario(res.data.user.email);
    return res;
  }

  async login(email: string, pass: string) {
    const res = await this.supabase.auth.signInWithPassword({ email, password: pass });
    if (res.data.user?.email) this.establecerUsuario(res.data.user.email);
    return res;
  }

  async logout() {
    await this.supabase.auth.signOut();
    this.currentUser.set(null); // Limpiamos el estado reactivo
  }

  // Método exigido en Check 31
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}