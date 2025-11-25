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

interface SignUpForm {
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

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  form = this._formBuilder.group<SignUpForm>({
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
            first_name: 'John',
            last_name: 'Doe',
            display_name: 'Johndoe99',
          },
        },
      });

      if (authResponse.error) {
        this.errorMessage.set(this.getErrorMessage(authResponse.error.message));
        return;
      }

      this.successMessage.set('Account created successfully!');
      this.form.reset();
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
