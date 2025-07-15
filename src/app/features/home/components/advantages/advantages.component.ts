import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AdvantageModalComponent } from '../advantage-modal/advantage-modal.component'; // ajuste o path se necessário

@Component({
  selector: 'app-advantages',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent {
  items = [
    {
      icon: 'local_shipping',
      title: 'Frete Grátis Brasil',
      description: 'Receba seus produtos com frete grátis em todo o território nacional em compras acima de R$ 99.',
      link: '#'
    },
    {
      icon: 'credit_card',
      title: 'Até 12x Sem Juros',
      description: 'Parcelamos suas compras em até 12 vezes sem juros nos principais cartões de crédito.',
      link: '#'
    },
    {
      icon: 'support_agent',
      title: 'Atendimento 24h',
      description: 'Nossa equipe de suporte está disponível 24 horas por dia para te ajudar sempre que precisar.',
      link: '#'
    }
  ];

  constructor(private dialog: MatDialog) {}

  openModal(item: any) {
    this.dialog.open(AdvantageModalComponent, {
      data: item,
      width: '400px'
    });
  }
}
