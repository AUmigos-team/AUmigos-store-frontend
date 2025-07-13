import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() item!: any;
  @Input() readOnly = false;

  @Output() increaseQuantity = new EventEmitter<number>();
  @Output() decreaseQuantity = new EventEmitter<number>();
  @Output() removeProduct = new EventEmitter<number>();

  increase() {
    this.increaseQuantity.emit(this.item.product.id);
  }

  decrease() {
    this.decreaseQuantity.emit(this.item.product.id);
  }

  remove() {
    this.removeProduct.emit(this.item.product.id);
  }

}
