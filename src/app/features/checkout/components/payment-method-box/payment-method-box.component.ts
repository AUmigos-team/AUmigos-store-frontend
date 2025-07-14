import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-method-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-method-box.component.html',
  styleUrls: ['./payment-method-box.component.scss']
})
export class PaymentMethodBoxComponent implements OnInit {
  @Output() pagamentoConfirmado = new EventEmitter<string>();
  metodos = ['cartao', 'pix', 'boleto'];
  metodoSelecionado: string = 'cartao';

  public pagamentoFoiConfirmado = false;

  ngOnInit(): void {
    const metodoSalvo = localStorage.getItem('metodoPagamentoSelecionado');
    if (metodoSalvo && this.metodos.includes(metodoSalvo)) {
      this.metodoSelecionado = metodoSalvo;
      this.pagamentoFoiConfirmado = true;

      this.pagamentoConfirmado.emit(metodoSalvo);
    }
  }


  selecionarMetodo(metodo: string) {
    this.metodoSelecionado = metodo;
    this.pagamentoFoiConfirmado = false;
  }

  getIcon(metodo: string): string {
    switch (metodo) {
      case 'cartao':
        return 'credit_card';
      case 'pix':
        return 'flash_on';
      case 'boleto':
        return 'receipt_long';
      default:
        return 'payment';
    }
  }

  getLabel(metodo: string): string {
    switch (metodo) {
      case 'cartao':
        return 'Cartão';
      case 'pix':
        return 'Pix';
      case 'boleto':
        return 'Boleto';
      default:
        return '';
    }
  }

  confirmarPagamento() {
    this.pagamentoFoiConfirmado = true;

    localStorage.setItem('metodoPagamentoSelecionado', this.metodoSelecionado);

    this.pagamentoConfirmado.emit(this.getLabel(this.metodoSelecionado));
  }


}
