import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

/**
 * Servicio centralizado para la gestión de autenticación con Supabase.
 * @description Maneja el registro, inicio de sesión, cierre de sesión y el estado reactivo del usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  
  /** * Signal reactivo que contiene el usuario actual. 
   * Si es null, no hay usuario logueado. 
   */
  currentUser = signal<User | null>(null);

  constructor() {
    // Inicializamos el cliente de Supabase con las claves de tu environment
    this.supabase = createClient(environment.supabase.url, environment.supabase.publicKey);

    // Esto escucha los cambios automáticamente (si el usuario entra o sale)
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.currentUser.set(session.user);
      } else {
        this.currentUser.set(null);
      }
    });
  }

  /**
   * Registra un nuevo operario en el sistema logístico.
   * @param email Correo electrónico del operario
   * @param password Contraseña de acceso (mínimo 6 caracteres)
   * @returns Promesa con los datos del usuario o un error
   */
  async register(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  /**
   * Inicia sesión en el panel de administración.
   * @param email Correo electrónico del operario
   * @param password Contraseña de acceso
   * @returns Promesa con la sesión o un error
   */
  async login(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  /**
   * Cierra la sesión actual del operario en el sistema.
   * @returns Promesa vacía al finalizar
   */
  async logout() {
    return await this.supabase.auth.signOut();
  }
}