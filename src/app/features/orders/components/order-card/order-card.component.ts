import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Order} from '../../../../core/interfaces/order';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() pedido!: Order;
  @Output() comprarNovamente = new EventEmitter<any[]>();

  onComprarNovamente() {
    this.comprarNovamente.emit(this.pedido.items);
  }


}
