import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { Order } from '../../../../core/interfaces/order';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../../core/services/cart.service';
import { CartSidebarService } from '../../../../core/services/cart-side-bar.service';
import { concatMap, from } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  pedidos: Order[] = [];
  statusSelecionado: string | null = null;
  paginaAtual = 0;
  totalPaginas = 0;
  tamanhoPagina = 3;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private cartSidebarService: CartSidebarService
  ) {}

  ngOnInit(): void {
    this.buscarPedidos();
  }

  buscarPedidos(page: number = 0): void {
    const params: any = {
      page,
      size: this.tamanhoPagina
    };
    if (this.statusSelecionado) {
      params.status = this.statusSelecionado;
    }

    this.http.get<any>('/api/order', { params }).subscribe({
      next: (res) => {
        const pedidosBrutos = res.content || [];

        const pedidosAdaptados = pedidosBrutos.map((order: any) => ({
          ...order,
          produtos: order.items.map((item: any) => ({
            nome: item.product.name,
            marca: item.product.brand?.name || '',
            imagem: item.product.imageUrl,
            preco: item.priceUnit,
            quantidade: item.quantity
          })),
          status: order.status?.name || ''
        }));

        this.pedidos = pedidosAdaptados;
        this.paginaAtual = res.number;
        this.totalPaginas = res.totalPages;
      },
      error: (err) => console.error('Erro ao buscar pedidos', err)
    });
  }

  filtrarPorStatus(status: string | null) {
    this.statusSelecionado = status;
    this.buscarPedidos(0);
  }

  irParaPagina(pagina: number) {
    if (pagina >= 0 && pagina < this.totalPaginas) {
      this.buscarPedidos(pagina);
    }
  }

  handleComprarNovamente(items: any[]) {
    const produtos = items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    from(produtos).pipe(
      concatMap(produto => this.cartService.addProduct(produto.productId, produto.quantity))
    ).subscribe({
      next: () => {},
      complete: () => this.cartSidebarService.openCart()
    });
  }
}
