import { Component } from '@angular/core';
import {NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import { filter } from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {AuthHeaderComponent} from './shared/components/auth-header/auth-header.component';
import {FooterComponent} from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, AuthHeaderComponent, RouterModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aumigos-store';
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/login', '/register', '/meus-dados'];
        this.showNavbar = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }
}
