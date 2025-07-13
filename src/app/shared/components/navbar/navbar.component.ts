import { Component, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CategoryDropdownComponent } from './category-dropdown/category-dropdown.component';
import { Category } from '../../../core/interfaces/category';
import { CategoryService } from '../../../core/services/category.service';
import { AuthService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CategoryDropdownComponent,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: Category[] = [];
  dropdownOpen = false;
  isLoggedIn = false;
  userName = '';
  userProfilePicture: string | null = null;

  private closeTimeout: any;

  constructor(
    private router: Router,
    public auth: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.name?.split(' ')[0] || '';

      const picture = user?.profilePicture;
      this.userProfilePicture =
        typeof picture === 'string'
          ? (picture.startsWith('data:') ? picture : `data:image/jpeg;base64,${picture}`)
          : null;
      setTimeout(() => {}, 0);
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }

  onMouseEnter(): void {
    clearTimeout(this.closeTimeout);
    this.dropdownOpen = true;
  }

  onMouseLeave(): void {
    this.closeTimeout = setTimeout(() => {
      this.dropdownOpen = false;
    }, 200);
  }
}
