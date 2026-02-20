import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Producto } from '../../../../core/services/product';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html'
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef); // <--- NUESTRO SALVAVIDAS

  producto: Producto | null = null;
  cargando = true;

  async ngOnInit() {
    // Leemos el ID de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id) {
      try {
        this.producto = await this.productService.getProductById(id);
      } catch (error) {
        console.error('Error al cargar el detalle', error);
      }
    }
    
    this.cargando = false;
    this.cdr.detectChanges(); // <--- OBLIGAMOS A ANGULAR A PINTAR LA PANTALLA
  }
}