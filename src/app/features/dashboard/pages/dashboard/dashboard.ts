import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { ProductService, Producto } from '../../../../core/services/product';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, DialogModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  productos: Producto[] = [];
  cargando: boolean = true; 

  mostrarModal: boolean = false;
  guardando: boolean = false;
  productoForm: FormGroup;
  
  // Variable nueva para saber qué producto estamos editando (si es null, estamos creando uno nuevo)
  productoEnEdicionId: number | null = null;

  constructor() {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0.1)]],
      stock: [null, [Validators.required, Validators.min(0)]]
    });
  }

  async ngOnInit() {
    await this.cargarInventario();
  }

  async cargarInventario() {
    this.cargando = true;
    try {
      this.productos = await this.productService.getProducts();
    } catch (error) {
      console.error('Error al cargar', error);
    } finally {
      this.cargando = false;
    }
  }

  abrirModalNuevo() {
    this.productoEnEdicionId = null; // Modo Creación
    this.productoForm.reset();
    this.mostrarModal = true;
  }

  // Nueva función: Abre el modal pero rellena los datos del producto seleccionado
  abrirModalEditar(producto: Producto) {
    this.productoEnEdicionId = producto.id || null; // Modo Edición
    this.productoForm.patchValue({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      stock: producto.stock
    });
    this.mostrarModal = true;
  }

  async guardarProducto() {
    if (this.productoForm.invalid) return;

    this.guardando = true;
    try {
      if (this.productoEnEdicionId) {
        // Si hay un ID guardado, actualizamos el producto existente
        await this.productService.updateProduct(this.productoEnEdicionId, this.productoForm.value);
      } else {
        // Si no hay ID, creamos uno nuevo
        await this.productService.createProduct(this.productoForm.value);
      }
      
      this.mostrarModal = false; 
      await this.cargarInventario(); 
    } catch (error) {
      console.error('Error al guardar', error);
      alert('Hubo un error al guardar el producto.');
    } finally {
      this.guardando = false;
    }
  }

  async borrarProducto(id: number | undefined, nombre: string) {
    if (!id) return; 
    
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`);
    if (confirmar) {
      try {
        await this.productService.deleteProduct(id);
        await this.cargarInventario(); 
      } catch (error) {
        console.error('Error al borrar', error);
      }
    }
  }

  async logout() {
    await this.authService.logout();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}