import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NewsletterComponent {
  email = '';
  petType = '';

  submitForm() {
    if (this.email && this.petType) {
      console.log('Enviado:', this.email, this.petType);
      alert('Cadastro realizado com sucesso!');
      this.email = '';
      this.petType = '';
    }
  }
}
