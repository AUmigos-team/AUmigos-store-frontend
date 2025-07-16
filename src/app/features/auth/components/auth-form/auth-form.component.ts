import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAuth } from '../../../../core/interfaces/user-auth';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgxMaskDirective, NgxMaskPipe} from 'ngx-mask';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() mode: 'register' | 'login' | 'edit' = 'register';
  @Input() title: string = '';
  @Input() userData?: UserAuth;
  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;
  hidePassword = true;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  serverError: string | null = null;
  imageChanged = false;

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

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

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
      phone: ['', [Validators.required, Validators.minLength(10)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', []],
      confirmPassword: ['', []],
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

      this.form.markAsPristine();

      this.previewUrl = this.userData.profilePicture
        ? 'data:image/jpeg;base64,' + this.userData.profilePicture
        : null;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    if (this.mode === 'login') {
      this.submitForm.emit({
        email: value.email,
        password: value.password
      });
      return;
    }

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

    if (value.password?.trim()) {
      formData.append('password', value.password);
    }

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    this.imageChanged = false;
    this.submitForm.emit(formData);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.imageChanged = true;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.cd.detectChanges();
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

  isInvalid(control: string): boolean {
    return (this.form.get(control)?.invalid && this.form.get(control)?.touched) ?? false;
  }

  hasError(control: string, error: string): boolean {
    return (this.form.get(control)?.hasError(error) && this.form.get(control)?.touched) ?? false;
  }

  setServerError(message: string) {
    this.serverError = message;
  }
}
