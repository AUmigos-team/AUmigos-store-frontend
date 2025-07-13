import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../../../core/services/auth-service.service';
import {UserAuth} from '../../../../core/interfaces/user-auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(data: Partial<UserAuth>) {
    if (!data.email || !data.password) {
      alert('Email e senha são obrigatórios.');
      return;
    }

    this.authService.login({ email: data.email, password: data.password }).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.authService.setUser(res.client);

        setTimeout(() => {
          this.router.navigateByUrl('/').then(() => {
            location.reload();
          });
        }, 10);

      },
      error: () => alert('Falha ao fazer login.')
    });
  }


}
