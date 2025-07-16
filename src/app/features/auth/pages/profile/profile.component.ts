import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../../../core/services/auth-service.service';
import { UserAuth } from '../../../../core/interfaces/user-auth';
import { Location } from '@angular/common';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, AuthFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user?: UserAuth;

  constructor(
    private authService: AuthService,
    private location: Location,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (u) => (this.user = u),
      error: () => this.toast.show('Erro ao carregar dados do usuário.', 'error')
    });
  }

  onUpdate(data: FormData) {
    this.authService.updateUser(data).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.user = updatedUser;
        this.toast.show('Sucesso', 'Dados atualizados com sucesso!', 'success');

        setTimeout(() => this.location.back(), 1200);
      },
      error: () => this.toast.show('Erro', 'Erro ao atualizar os dados.', 'error')
    });
  }
}
