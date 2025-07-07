import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvantagesComponent } from './components/advantages/advantages.component';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import {Product} from '../../core/interfaces/product';
import {CategoryCarouselComponent} from './components/category-carousel/category-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AdvantagesComponent, BannerCarouselComponent, ProductCardComponent, CategoryCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recommendedProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getRecommendedProducts().subscribe({
      next: (res) => {
        this.recommendedProducts = res.content;
      }
    });
  }

  catItems = [
    { image: 'assets/gato-cama.png', label: 'Cama, almofada e toca' },
    { image: 'assets/gato-racao.png', label: 'Ração' },
    { image: 'assets/gato-roupa.png', label: 'Roupas de verão e inverno' },
    { image: 'assets/gato-alimentacao.png', label: 'Alimentação' }
  ];

  dogItems = [
    { image: 'assets/cachorro-cama.png', label: 'Cama, almofada e toca' },
    { image: 'assets/cachorro-racao.png', label: 'Ração' },
    { image: 'assets/cachorro-roupa.png', label: 'Roupas de verão e inverno' },
    { image: 'assets/cachorro-alimentacao.png', label: 'Alimentação' }
  ];
}
