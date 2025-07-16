import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import {provideNgxMask} from 'ngx-mask';
import {HttpErrorInterceptor} from './core/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxMask(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
};
