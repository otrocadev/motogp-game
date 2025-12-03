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

interface SignUpForm {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  form = this._formBuilder.group<SignUpForm>({
    name: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    surname: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    username: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
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
    this.successMessage.set(null);

    try {
      const authResponse = await this._authService.signUp({
        email: this.form.value.email!,
        password: this.form.value.password!,
        options: {
          data: {
            first_name: this.form.value.name!,
            last_name: this.form.value.surname!,
            display_name: this.form.value.username!,
          },
        },
      });

      if (authResponse.error) {
        this.errorMessage.set(this.getErrorMessage(authResponse.error.message));
        return;
      }

      this.successMessage.set('Account created successfully!');
      await this._router.navigate(['/']);
    } catch (error) {
      this.errorMessage.set('Unexpected error. Please try again later.');
      console.error('Sign up error:', error);
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
    if (error.includes('User already registered')) {
      return 'This email is already registered';
    }
    if (error.includes('Password should be at least')) {
      return 'Password must be at least 6 characters';
    }
    if (error.includes('Invalid email')) {
      return 'Invalid email format';
    }
    if (error.includes('Too many requests')) {
      return 'Too many requests. Please try again later.';
    }
    return 'Unexpected error. Please try again later.';
  }
}
