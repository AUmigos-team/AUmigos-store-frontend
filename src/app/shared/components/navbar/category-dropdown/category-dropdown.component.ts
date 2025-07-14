import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subcategory } from '../../../../core/interfaces/subcategory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.css']
})
export class CategoryDropdownComponent {
  @Input() name!: string;
  @Input() subcategories: Subcategory[] = [];
  @Input() highlightColor: string = '#ccc';

  hovering = false;

  constructor(private router: Router) {}

  goToCategory(): void {
    const categorySlug = this.name.toLowerCase();
    this.router.navigate(['/produtos', categorySlug]);
  }

  goToSubcategory(sub: Subcategory): void {
    const categorySlug = this.name.toLowerCase();
    const subSlug = this.slugify(sub.name);
    this.router.navigate(['/produtos', categorySlug, subSlug]);
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .trim();
  }

}
