import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../core/interfaces/cart/cart-item';
import { DeliveryAddressBoxComponent } from '../../components/delivery-address-box/delivery-address-box.component';
import { PaymentMethodBoxComponent } from '../../components/payment-method-box/payment-method-box.component';
import { MoreItemsButtonComponent } from '../../components/more-items-button/more-items-button.component';
import {
  OrderSumaryBoxComponent,
} from '../../components/order-sumary-box/order-sumary-box.component';
import {CartItemBoxComponent} from '../../components/cart-item-box/cart-item-box.component';
import {ProductCardComponent} from '../../../../shared/components/product-card/product-card.component';
import {CartItemComponent} from '../../../cart/components/cart-item/cart-item.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    DeliveryAddressBoxComponent,
    PaymentMethodBoxComponent,
    OrderSumaryBoxComponent,
    CartItemBoxComponent,
    MoreItemsButtonComponent,
    ProductCardComponent,
    CartItemComponent
  ],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart.cart?.items || [];
    });
  }

  onQuantityChange(event: { productId: number; newQuantity: number }): void {
    const { productId, newQuantity } = event;

    const currentItem = this.cartItems.find(item => item.product.id === productId);
    if (!currentItem) return;

    const difference = newQuantity - currentItem.quantity;

    if (difference > 0) {
      this.cartService.addProduct(productId, difference).subscribe(() => {
        this.loadCartItems();
      });
    } else if (difference < 0) {
      this.cartService.removeProduct(productId, Math.abs(difference)).subscribe(() => {
        this.loadCartItems();
      });
    }
  }

}
