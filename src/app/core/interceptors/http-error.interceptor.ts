import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.toast.show('Erro de rede', 'Não foi possível se conectar ao servidor.', 'error');
        } else if (error.status === 401 || error.status === 403) {
          this.toast.show('Acesso negado', 'Você precisa estar logado.', 'warning');
        } else {
          this.toast.show(
            'Erro',
            error.error?.message || 'Algo deu errado. Tente novamente.',
            'error'
          );
        }

        return throwError(() => error);
      })
    );
  }
}
