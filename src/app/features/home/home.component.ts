import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvantagesComponent } from './components/advantages/advantages.component';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import {Product} from '../../core/interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AdvantagesComponent, BannerCarouselComponent, ProductCardComponent],
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
}
