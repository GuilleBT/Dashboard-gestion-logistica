import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Módulos de PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

// Tus servicios
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

  // Variables para controlar el cuadro flotante (Modal)
  mostrarModal: boolean = false;
  guardando: boolean = false;
  productoForm: FormGroup;

  constructor() {
    // Inicializamos el formulario con validaciones estrictas
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

  // Abre el modal y limpia el formulario
  abrirModalNuevo() {
    this.productoForm.reset();
    this.mostrarModal = true;
  }

  // Envía los datos a Supabase
  async guardarProducto() {
    if (this.productoForm.invalid) return;

    this.guardando = true;
    try {
      // Llamamos al servicio para crear el producto
      await this.productService.createProduct(this.productoForm.value);
      this.mostrarModal = false; // Cerramos el modal
      await this.cargarInventario(); // Recargamos la tabla para ver el nuevo producto
    } catch (error) {
      console.error('Error al guardar', error);
    } finally {
      this.guardando = false;
    }
  }
  // Elimina un producto pidiendo confirmación primero
  async borrarProducto(id: number | undefined, nombre: string) {
    if (!id) return; // Seguridad extra
    
    // Lanzamos la alerta nativa del navegador (queda pro y no requiere librerías extra)
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}" del almacén? Esta acción no se puede deshacer.`);
    
    if (confirmar) {
      try {
        await this.productService.deleteProduct(id);
        // Recargamos la tabla para que el producto desaparezca de la pantalla
        await this.cargarInventario(); 
      } catch (error) {
        console.error('Error al borrar el producto', error);
        alert('Hubo un error al intentar borrar el producto.');
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