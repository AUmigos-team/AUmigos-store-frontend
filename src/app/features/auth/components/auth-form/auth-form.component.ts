import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserAuth } from '../../../../core/interfaces/user-auth';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent implements OnInit {
  @Input() mode: 'login' | 'register' | 'edit' = 'register';
  @Input() title: string = '';
  @Input() userData?: UserAuth;
  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;
  hidePassword = true;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  days = Array.from({ length: 31 }, (_, i) => i + 1);
  months = [
    { value: '01', label: 'Janeiro' }, { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' }, { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' }, { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' }, { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' }, { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' }, { value: '12', label: 'Dezembro' },
  ];
  years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.mode === 'login') {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
      return;
    }

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: [''],
      confirmPassword: [''],
      cpf: ['', Validators.required],
      birthDay: ['', Validators.required],
      birthMonth: ['', Validators.required],
      birthYear: ['', Validators.required],
      gender: ['', Validators.required]
    });

    if (this.mode === 'register') {
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.get('confirmPassword')?.setValidators([Validators.required]);
      this.form.setValidators(this.passwordsMatchValidator);
    }

    if (this.mode === 'edit' && this.userData) {
      const [year = '', month = '', day = ''] = this.userData.birthDate?.split('-') || [];
      this.form.patchValue({
        ...this.userData,
        birthYear: year,
        birthMonth: month,
        birthDay: day
      });
      this.previewUrl = this.userData.profilePicture
        ? 'data:image/jpeg;base64,' + this.userData.profilePicture
        : null;
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const day = value.birthDay?.toString().padStart(2, '0') ?? '';
    const month = value.birthMonth?.toString().padStart(2, '0') ?? '';
    const year = value.birthYear ?? '';
    const birthDate = `${year}-${month}-${day}`;

    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('phone', value.phone);
    formData.append('cpf', value.cpf);
    formData.append('birthDate', birthDate);
    formData.append('gender', value.gender);

    if (this.mode === 'register') {
      formData.append('password', value.password);
    }

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    if (this.mode === 'login') {
      this.submitForm.emit({
        email: value.email,
        password: value.password
      });
    } else {
      this.submitForm.emit(formData);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
}
