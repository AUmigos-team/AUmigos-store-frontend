import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';
import {ProductListComponent} from './features/products/pages/product-list/product-list.component';
import {CheckoutPageComponent} from './features/checkout/pages/checkout-page/checkout-page.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'meus-dados',
    loadComponent: () =>
      import('./features/auth/pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'produtos',
    component: ProductListComponent
  },
  {
    path: 'produtos/:categoria',
    component: ProductListComponent
  },
  {
    path: 'produtos/:categoria/:subcategoria',
    component: ProductListComponent
  },
  {
    path: 'buscar/:termo',
    component: ProductListComponent
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/pages/checkout-page/checkout-page.component').then(m => m.CheckoutPageComponent),
  }
];
