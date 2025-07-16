import {Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss']
})
export class BannerCarouselComponent {

  banners = [
    {
      image: 'assets/banners/carrosel-1.png',
      categorySlug: 'cachorro',
      subcategorySlug: 'acessorios'
    },
    {
      image: 'assets/banners/carrossel-5.png',
      categorySlug: 'gato',
      subcategorySlug: 'brinquedos'
    },
    {
      image: 'assets/banners/carrossel-4.png',
      categorySlug: 'cachorro',
      subcategorySlug: 'acessorios'
    },
    {
      image: 'assets/banners/carrosel-3.png',
      categorySlug: 'cachorro',
      subcategorySlug: 'roupas'
    },
    {
      image: 'assets/banners/carrossel-2.png',
      categorySlug: 'gato',
      subcategorySlug: 'petiscos'
    },
  ];

  activeIndex = 0;
  prevIndex = 0;
  nextIndex = 0;

  showSideBanners = true;

  constructor(private router: Router) {}

  @HostListener('window:resize')
  onResize(): void {
    this.updateSideBannerVisibility();
  }

  updateSideBannerVisibility(): void {
    this.showSideBanners = window.innerWidth > 992;
  }

  updateIndexes(): void {
    const total = this.banners.length;
    this.prevIndex = (this.activeIndex - 1 + total) % total;
    this.nextIndex = (this.activeIndex + 1) % total;
  }

  prevSlide(): void {
    this.activeIndex = this.prevIndex;
    this.updateIndexes();
  }

  nextSlide(): void {
    this.activeIndex = this.nextIndex;
    this.updateIndexes();
  }

  goToSlide(index: number): void {
    this.activeIndex = index;
  }

  goToSubcategory(): void {
    const banner = this.banners[this.activeIndex];
    this.router.navigate(['/produtos', banner.categorySlug, banner.subcategorySlug]);
  }
}
