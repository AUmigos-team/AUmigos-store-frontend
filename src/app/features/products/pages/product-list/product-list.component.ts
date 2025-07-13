import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';

import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { CartService } from '../../../../core/services/cart.service';
import { CartSidebarService } from '../../../../core/services/cart-side-bar.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [BreadcrumbComponent, ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categoriaSlug = '';
  subcategoriaSlug = '';
  produtos: any[] = [];
  tituloPagina = 'Lista de Produtos';
  busca = '';
  categoriaLabel = '';
  subcategoriaLabel = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private cartSidebarService: CartSidebarService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(([params, query]) => {
      const categoria = params.get('categoria') || '';
      const subcategoria = params.get('subcategoria') || '';
      const search = params.get('termo') || query.get('search') || '';

      this.categoriaSlug = categoria;
      this.subcategoriaSlug = subcategoria;
      this.busca = search;

      this.categoriaLabel = this.getNomeCategoria(categoria);
      this.subcategoriaLabel = this.formatarNome(subcategoria);

      this.fetchProducts(categoria, subcategoria, search);
    });
  }

  formatarNome(slug: string): string {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, letra => letra.toUpperCase());
  }

  fetchProducts(categoria: string, subcategoria: string, search: string) {
    const url = '/api/products';
    const params: any = { page: 0, size: 10 };

    if (categoria) params.category = categoria;
    if (subcategoria) params.subcategory = subcategoria;
    if (search) params.search = search;

    this.http.get(url, { params }).subscribe({
      next: (res: any) => {
        this.produtos = res.content;

        if (res.content.length > 0) {
          if (search) {
            this.tituloPagina = `Resultados para "${search}"`;
          } else if (categoria || subcategoria) {
            const sub = res.content[0].subcategory?.name || '';
            this.tituloPagina = `${sub} para ${this.getNomeCategoria(categoria)}`;
          } else {
            this.tituloPagina = 'Lista de Produtos';
          }
        } else {
          this.tituloPagina = search
            ? `Nenhum resultado encontrado para "${search}"`
            : 'Nenhum produto encontrado';
        }
      },
      error: err => {
        this.tituloPagina = 'Erro ao carregar produtos';
      }
    });
  }

  onAddToCart(productId: number) {
    this.cartService.addProduct(productId).subscribe(() => {
      this.cartSidebarService.openCart();
    });
  }

  getNomeCategoria(slug: string): string {
    const map: { [key: string]: string } = {
      cachorro: 'Cachorro',
      gato: 'Gato',
      peixe: 'Peixe',
      passaro: 'Pássaro',
      'outros-pets': 'Outros Pets',
      'casa-e-jardim': 'Casa e Jardim'
    };
    return map[slug] || this.formatarNome(slug);
  }
}
