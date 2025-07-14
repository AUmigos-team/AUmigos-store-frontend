import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
      link: '#'
    },
    {
      icon: 'credit_card',
      title: 'Até 12x Sem Juros',
      link: '#'
    },
    {
      icon: 'support_agent',
      title: 'Atendimento 24h',
      link: '#'
    }
  ];
}
