import {Component, OnInit} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CategoryDropdownComponent} from './category-dropdown/category-dropdown.component';
import {Category} from '../../../core/interfaces/category';
import {CategoryService} from '../../../core/services/category.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatMenuModule, MatIconModule, MatButtonModule, CategoryDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
