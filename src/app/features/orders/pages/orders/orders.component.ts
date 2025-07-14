import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../components/order-card/order-card.component';
import { Order } from '../../../../core/interfaces/order';
import { HttpClient } from '@angular/common/http';
import {CartService} from '../../../../core/services/cart.service';
import {CartSidebarService} from '../../../../core/services/cart-side-bar.service';
import {forkJoin} from 'rxjs';

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
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private cartSidebarService: CartSidebarService
  ) {}

  ngOnInit(): void {
    this.http.get<any>('/api/order?page=0&size=5').subscribe({
      next: (res: any) => {
        this.pedidos = res.content || res;
      },
      error: (err: any) => console.error('Erro ao buscar pedidos', err)
    });
  }

  handleComprarNovamente(items: any[]) {
    let requests = items.map(item => {
      const productId = item.product.id;
      const quantity = item.quantity;

      return this.cartService.addProduct(productId, quantity);
    });

    forkJoin(requests).subscribe({
      next: () => {
        this.cartSidebarService.openCart();
      },
      error: (err) => console.error('Erro ao adicionar produtos', err)
    });
  }

  buscarPedidos(): void {
    this.http.get<any>('/api/order?page=0&size=50').subscribe({
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

        this.pedidos = this.statusSelecionado
          ? pedidosAdaptados.filter((p: Order) => p.status === this.statusSelecionado)
          : pedidosAdaptados;
      },
      error: (err) => console.error('Erro ao buscar pedidos', err)
    });
  }

  filtrarPorStatus(status: string | null) {
    this.statusSelecionado = status;
    this.buscarPedidos();
  }
}
