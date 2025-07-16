import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';
import { AdvantagesComponent } from './components/advantages/advantages.component';
import { BannerCarouselComponent } from './components/banner-carousel/banner-carousel.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import {Product} from '../../core/interfaces/product';
import { Category } from '../../core/interfaces/category';
import {CategoryCarouselComponent} from './components/category-carousel/category-carousel.component';
import {CartService} from '../../core/services/cart.service';
import {CartSidebarService} from '../../core/services/cart-side-bar.service';
import {NewsletterComponent} from './components/newsletter/newsletter.component';
import {BrandShowcaseComponent} from './components/brand/brand.component';
import {ToastService} from '../../core/services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AdvantagesComponent,
    BannerCarouselComponent,
    ProductCardComponent,
    CategoryCarouselComponent,
    NewsletterComponent,
    BrandShowcaseComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recommendedProducts: Product[] = [];
  dogItems: { image: string; label: string }[] = [];
  catItems: { image: string; label: string }[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private cartSidebarService: CartSidebarService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.productService.getRecommendedProducts().subscribe({
      next: (res) => {
        this.recommendedProducts = res.content;
      }
    });

    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      const dogCategory = categories.find(cat => cat.name === 'Cachorro');
      const catCategory = categories.find(cat => cat.name === 'Gato');

      this.dogItems = dogCategory?.subcategories?.map((sub) => ({
        image: sub.image,
        label: sub.name,
        categorySlug: dogCategory.slug,
        subSlug: this.slugify(sub.name)
      })) || [];

      this.catItems = catCategory?.subcategories?.map((sub) => ({
        image: sub.image,
        label: sub.name,
        categorySlug: catCategory.slug,
        subSlug: this.slugify(sub.name)
      })) || [];

    });
  }

  onAddToCart(productId: number) {
    this.cartService.addProduct(productId).subscribe({
      next: () => this.cartSidebarService.openCart(),
      error: () =>
        this.toast.show(
          'Acesso negado',
          'Você precisa estar logado para adicionar itens ao carrinho.',
          'warning'
        )
    });
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
