import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService} from '../../../../core/services/brand.service';
import { Brand} from '../../../../core/interfaces/band';

@Component({
  selector: 'app-brand-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandShowcaseComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit() {
    const favorites = ['Premier Pet', 'Whiskas', 'Bayer', 'Golden', 'Petz'];

    this.brandService.getBrands().subscribe(brands => {
      this.brands = brands.filter(b => favorites.includes(b.name));
    });
  }
}
