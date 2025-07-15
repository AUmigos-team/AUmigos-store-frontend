import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule
} from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './shared/components/auth-header/auth-header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoaderService } from './core/services/loader.service';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    AuthHeaderComponent,
    RouterModule,
    FooterComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aumigos-store';
  showNavbar = true;
  isLoading = false;

  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/login', '/register', '/meus-dados'];
        this.showNavbar = !hiddenRoutes.includes(event.urlAfterRedirects);
      });

    this.loaderService.loading$.subscribe(val => this.isLoading = val);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => this.loaderService.hide(), 200);
      }
    });
  }
}
