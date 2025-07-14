import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-sumary-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-sumary-box.component.html',
  styleUrls: ['./order-sumary-box.component.scss']
})
export class OrderSumaryBoxComponent {
  @Input() endereco!: string;
  @Input() pagamento!: string;
  @Input() subtotal!: number;
  @Input() cartItems: any[] = [];


  @Output() fazerPedido = new EventEmitter<void>();

  onClickFazerPedido() {
    this.fazerPedido.emit();
  }
}
