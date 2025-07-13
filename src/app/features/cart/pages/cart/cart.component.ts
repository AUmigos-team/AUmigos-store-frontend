import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Cart} from '../../../../core/interfaces/cart/cart';
import {CartService} from '../../../../core/services/cart.service';
import {CartItemComponent} from '../../components/cart-item/cart-item.component';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, DecimalPipe, CommonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() checkout = new EventEmitter<void>();

  cart: Cart | null = null;

  constructor(private cartService: CartService, private router: Router ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(res => {
      this.cart = res.cart ?? { id: 0, items: [] };
    });
  }

  get total(): number {
    return this.cart?.totalValue || 0;
  }

  get hasItems(): boolean {
    return !!this.cart?.items?.length;
  }

  onIncrease(productId: number) {
    this.cartService.addProduct(productId).subscribe(() => {
      this.loadCart();
    });
  }

  onDecrease(productId: number) {
    this.cartService.removeProduct(productId).subscribe(() => {
      this.loadCart();
    });
  }

  onClose() {
    this.close.emit();
  }

  onRemove(productId: number) {
    const item = this.cart?.items.find(i => i.product.id === productId);
    const quantity = item?.quantity || 0;

    const removeAll = async () => {
      for (let i = 0; i < quantity; i++) {
        await firstValueFrom(this.cartService.removeProduct(productId));
      }
      this.loadCart();
    };

    removeAll();
  }

  goToCheckout(): void {
    this.checkout.emit();
  }
}
