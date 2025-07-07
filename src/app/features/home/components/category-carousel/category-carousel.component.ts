import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

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
}
