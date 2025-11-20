import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';

interface LogInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
})
export default class LogInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  form = this._formBuilder.group<LogInForm>({
    email: this._formBuilder.control(null, [
      Validators.required,
      Validators.email,
      this.strictEmailValidator,
    ]),
    password: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const authResponse = await this._authService.logIn({
        email: this.form.value.email!,
        password: this.form.value.password!,
      });

      if (authResponse.error) {
        this.errorMessage.set(this.getErrorMessage(authResponse.error.message));
        return;
      }

      this._router.navigate(['/']);
    } catch (error) {
      this.errorMessage.set('Unexpected error. Please try again later.');
      console.error('Login error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private strictEmailValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) return null;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);

    return valid ? null : { strictEmail: true };
  }

  private getErrorMessage(error: string): string {
    if (error.includes('Invalid login credentials')) {
      return 'Invalid email or password';
    }
    if (error.includes('Email not confirmed')) {
      return 'Please confirm your email before logging in';
    }
    if (error.includes('Too many requests')) {
      return 'Too many requests. Please try again later.';
    }
    return 'Unexpected error. Please try again later.';
  }
}
