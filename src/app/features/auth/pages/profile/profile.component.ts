import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../../../core/services/auth-service.service';
import { UserAuth } from '../../../../core/interfaces/user-auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user?: UserAuth;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (u) => (this.user = u),
      error: () => alert('Erro ao carregar dados do usuário.'),
    });
  }

  onUpdate(data: FormData) {
    this.authService.updateUser(data).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));

        this.user = updatedUser;

        alert('Dados atualizados com sucesso!');
      },
      error: () => alert('Erro ao atualizar dados.')
    });
  }


}
