import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../../../core/services/newsletter.service';
import { Newsletter } from '../../../../core/interfaces/newsletter';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  email: string = '';
  selectedPets: string[] = [];
  dropdownOpen = false;
  successMessage: string = '';
  errorMessage: string = '';

  petOptions = ['Cachorro', 'Gato', 'Peixe', 'Pássaro'];

  constructor(private newsletterService: NewsletterService) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onPetToggle(pet: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedPets.push(pet);
    } else {
      this.selectedPets = this.selectedPets.filter(p => p !== pet);
    }
  }

  submitForm() {
    const payload: Newsletter = {
      email: this.email,
      petOptions: this.selectedPets
    };

    this.newsletterService.subscribe(payload).subscribe({
      next: (res) => {
        if (res?.success === false) {
          this.errorMessage = 'Erro ao se inscrever. Tente novamente.';
          this.successMessage = '';
          setTimeout(() => this.errorMessage = '', 7000);
          return;
        }

        this.successMessage = 'Inscrição realizada com sucesso!';
        this.errorMessage = '';
        this.email = '';
        this.selectedPets = [];
        this.dropdownOpen = false;

        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (err) => {
        console.error('Erro ao se inscrever:', err);
        this.errorMessage = 'Erro ao se inscrever. Tente novamente.';
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 4000);
      }
    });
  }
}
