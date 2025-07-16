import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';

import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { CartService } from '../../../../core/services/cart.service';
import { CartSidebarService } from '../../../../core/services/cart-side-bar.service';
import {ToastService} from '../../../../core/services/toast.service';

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

  page = 0;
  totalPages = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private cartSidebarService: CartSidebarService,
    private toast: ToastService
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

      this.fetchProducts(categoria, subcategoria, search, 0);
    });
  }

  formatarNome(slug: string): string {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, letra => letra.toUpperCase());
  }

  fetchProducts(categoria: string, subcategoria: string, search: string, page: number = 0) {
    const url = '/api/products';
    const params: any = { page, size: 12 };

    if (categoria) params.category = categoria;
    if (subcategoria) params.subcategory = subcategoria;
    if (search) params.search = search;

    this.http.get(url, { params }).subscribe({
      next: (res: any) => {
        this.produtos = res.content;
        this.page = res.number;
        this.totalPages = res.totalPages;

        if (res.content.length > 0) {
          if (search) {
            this.tituloPagina = `Resultados para "${search}"`;
          } else if (categoria && subcategoria) {
            this.tituloPagina = `${this.formatarNome(subcategoria)} para ${this.getNomeCategoria(categoria)}`;
          } else if (categoria) {
            this.tituloPagina = `Produtos para ${this.getNomeCategoria(categoria)}`;
          } else {
            this.tituloPagina = 'Lista de Produtos';
          }
        } else {
          this.tituloPagina = search
            ? `Nenhum resultado encontrado para "${search}"`
            : 'Nenhum produto encontrado';
        }
      },
      error: () => {
        this.tituloPagina = 'Erro ao carregar produtos';
      }
    });
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.fetchProducts(this.categoriaSlug, this.subcategoriaSlug, this.busca, this.page + 1);
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.fetchProducts(this.categoriaSlug, this.subcategoriaSlug, this.busca, this.page - 1);
    }
  }

  onAddToCart(productId: number) {
    this.cartService.addProduct(productId).subscribe({
      next: () => this.cartSidebarService.openCart(),
      error: () =>
          this.toast.show(
            'Acesso negado',
            'Você precisa estar logado para adicionar itens ao carrinho.',
            'warning'
          )
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
