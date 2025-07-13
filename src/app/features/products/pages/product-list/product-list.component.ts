import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BreadcrumbComponent} from '../../../../shared/components/breadcrumb/breadcrumb.component';
import {ProductCardComponent} from '../../../../shared/components/product-card/product-card.component';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {CartService} from '../../../../core/services/cart.service';
import {CartSidebarService} from '../../../../core/services/cart-side-bar.service';

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private cartSidebarService: CartSidebarService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoria = params['categoria'];
      const subcategoria = params['subcategoria'];

      this.categoriaSlug = categoria || '';
      this.subcategoriaSlug = subcategoria || '';

      this.definirTituloPagina(categoria, subcategoria);
      this.fetchProducts(categoria, subcategoria);
    });

    this.route.queryParams.subscribe(query => {
      const search = query['search'];
      if (search) {
        this.tituloPagina = `Resultados para "${search}"`;
      }
    });
  }

  definirTituloPagina(categoria: string, subcategoria: string) {
    if (subcategoria) {
      this.tituloPagina = this.formatarNome(subcategoria);
    } else if (categoria) {
      this.tituloPagina = this.formatarNome(categoria);
    } else {
      this.tituloPagina = 'Lista de Produtos';
    }
  }

  formatarNome(slug: string): string {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, letra => letra.toUpperCase());
  }

  fetchProducts(categoria: string, subcategoria: string) {
    const url = '/api/products';
    const params: any = {
      page: 0,
      size: 12,
      category: categoria,
      subcategory: subcategoria
    };

    this.http.get(url, { params }).subscribe({
      next: (res: any) => {
        this.produtos = res.content;

        if (res.content.length > 0) {
          const sub = res.content[0].subcategory?.name || '';
          const cat = categoria;
          this.tituloPagina = `${sub} para ${this.getNomeCategoria(cat)}`;
        } else {
          this.tituloPagina = 'Nenhum produto encontrado';
        }
      },
      error: err => {
        console.error('Erro ao buscar produtos', err);
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
    return map[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  }

}
