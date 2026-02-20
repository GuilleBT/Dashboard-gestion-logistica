import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export interface Producto {
  id?: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

/**
 * Servicio para gestionar el CRUD de la tabla 'productos' en Supabase.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.publicKey);
  }

  /** Obtiene todos los productos del inventario (READ) */
  async getProducts(): Promise<Producto[]> {
    const { data, error } = await this.supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: false }); // Los más nuevos primero
      
    if (error) throw error;
    return data || [];
  }
  /** Obtiene un producto individual por su ID */
  async getProductById(id: number): Promise<Producto | null> {
    const { data, error } = await this.supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error al obtener producto', error);
      return null;
    }
    return data;
  }

  /** Crea un nuevo producto (CREATE) */
  async createProduct(producto: Producto) {
    const { data, error } = await this.supabase
      .from('productos')
      .insert([producto]);
      
    if (error) throw error;
    return data;
  }

  /** Actualiza un producto existente (UPDATE) */
  async updateProduct(id: number, producto: Partial<Producto>) {
    const { data, error } = await this.supabase
      .from('productos')
      .update(producto)
      .eq('id', id);
      
    if (error) throw error;
    return data;
  }

  /** Borra un producto del inventario (DELETE) */
  async deleteProduct(id: number) {
    const { data, error } = await this.supabase
      .from('productos')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return data;
  }
}