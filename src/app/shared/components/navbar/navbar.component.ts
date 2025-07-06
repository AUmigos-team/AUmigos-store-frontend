import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CategoryDropdownComponent} from './category-dropdown/category-dropdown.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatMenuModule, MatIconModule, MatButtonModule, CategoryDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categories = [
    { name: 'Cachorro', subcategories: ['Ração', 'Brinquedos', 'Acessórios'], color: '#FF5C5C', },
    { name: 'Gato', subcategories: ['Arranhador', 'Areia', 'Petiscos'],     color: '#7D5EFF'},
    { name: 'Pássaro', subcategories: ['Gaiolas', 'Comida'],     color: '#FF9F1C'},
    { name: 'Peixe', subcategories: ['Aquários', 'Filtros'] },
    { name: 'Outros animais', subcategories: [] },
    { name: 'Casa e jardim', subcategories: [] }
  ];
}
