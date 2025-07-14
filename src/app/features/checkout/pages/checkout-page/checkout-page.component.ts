import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../core/interfaces/cart/cart-item';
import { DeliveryAddressBoxComponent } from '../../components/delivery-address-box/delivery-address-box.component';
import { PaymentMethodBoxComponent } from '../../components/payment-method-box/payment-method-box.component';
import { MoreItemsButtonComponent } from '../../components/more-items-button/more-items-button.component';
import {
  OrderSumaryBoxComponent,
} from '../../components/order-sumary-box/order-sumary-box.component';
import {CartItemComponent} from '../../../cart/components/cart-item/cart-item.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    DeliveryAddressBoxComponent,
    PaymentMethodBoxComponent,
    OrderSumaryBoxComponent,
    MoreItemsButtonComponent,
    CartItemComponent
  ],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  enderecoSelecionado: string = '';
  pagamentoSelecionado: string = '';

  subtotal: number = 0;

  public metodoPagamentoSelecionado: string | null = null;


  constructor(private cartService: CartService, private http: HttpClient) {}


  ngOnInit(): void {
    this.loadCartItems();

    const metodoSalvo = localStorage.getItem('metodoPagamentoSelecionado');
    if (metodoSalvo) {
      this.metodoPagamentoSelecionado = metodoSalvo;
    }
  }

  onMetodoSelecionado(metodo: string) {
    this.metodoPagamentoSelecionado = metodo;
    this.pagamentoSelecionado = metodo;
  }

  finalizarPedido() {
    const endereco = JSON.parse(localStorage.getItem('enderecoSalvo') || '{}');
    const metodo = localStorage.getItem('metodoPagamentoSelecionado');

    if (!endereco?.cep || !metodo) {
      alert('Endereço ou método de pagamento ausente!');
      return;
    }

    const produtosMap: Record<string, number> = {};
    this.cartItems.forEach(item => {
      produtosMap[item.product.id] = item.quantity;
    });

    const body = {
      zipCode: endereco.cep,
      street: endereco.rua,
      number: endereco.numero,
      complement: endereco.complemento || '',
      neighborhood: endereco.bairro,
      city: endereco.cidade,
      state: endereco.estado,
      products: produtosMap,
      paymentMethodId: this.getPaymentMethodId(metodo)
    };

    this.http.post('/api/order/process', body).subscribe({
      next: () => {
        alert('Pedido realizado com sucesso!');
      },
      error: () => {
        alert('Erro ao realizar pedido.');
      }
    });
  }

  getPaymentMethodId(metodo: string): number {
    switch (metodo.toLowerCase()) {
      case 'Cartão':
      case 'Cartao':
        return 1;
      case 'Pix':
        return 2;
      case 'Boleto':
        return 3;
      default:
        return 1;
    }
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.cart?.items || [];
      this.subtotal = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    });
  }

  onEnderecoPreenchido(endereco: string) {
    this.enderecoSelecionado = endereco;
  }

}
