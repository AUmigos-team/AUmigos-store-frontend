import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-carousel.component.html',
  styleUrl: './category-carousel.component.scss'
})
export class CategoryCarouselComponent {
  @Input() title!: string;
  @Input() items: { image: string; label: string }[] = [];

  currentIndex = 0;

  constructor(private router: Router) {}

  next() {
    if (this.currentIndex < this.items.length - 4) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  navigateToSubcategory(label: string) {
    const subSlug = this.slugify(label);

    const categoria = this.title.toLowerCase().includes('gato') ? 'gato' :
      this.title.toLowerCase().includes('cachorro') ? 'cachorro' :
        '';

    if (categoria) {
      this.router.navigate(['/produtos', categoria, subSlug]);
    } else {
      this.router.navigate(['/produtos'], {
        queryParams: { search: label }
      });
    }
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
