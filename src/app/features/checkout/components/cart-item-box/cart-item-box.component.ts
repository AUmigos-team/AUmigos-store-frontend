import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cart-item-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item-box.component.html',
  styleUrl: './cart-item-box.component.scss'
})
export class CartItemBoxComponent {
  @Input() item: any;

  @Output() quantityChange = new EventEmitter<{ productId: number; newQuantity: number }>();

  increase() {
    this.quantityChange.emit({ productId: this.item.product.id, newQuantity: this.item.quantity + 1 });
  }

  decrease() {
    if (this.item.quantity > 1) {
      this.quantityChange.emit({ productId: this.item.product.id, newQuantity: this.item.quantity - 1 });
    }
  }
}
