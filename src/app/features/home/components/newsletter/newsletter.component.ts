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
  email: string = '';
  petTypes: string[] = [];

  petOptions = ['Cachorro', 'Gato', 'Peixe', 'Pássaro'];
  selectedPets: string[] = [];
  dropdownOpen = false;

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
    console.log('Email:', this.email);
    console.log('Pets selecionados:', this.petTypes);
  }
}
