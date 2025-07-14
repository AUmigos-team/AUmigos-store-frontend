import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service.service';
import { Router } from '@angular/router';
import { UserAuth } from '../../../../core/interfaces/user-auth';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onRegister(data: Partial<UserAuth> | FormData) {
    const request$ = data instanceof FormData
      ? this.authService.registerWithFormData(data)
      : this.authService.register(data as UserAuth);

    request$.subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        alert('Erro ao criar conta.');
      }
    });
  }
}
