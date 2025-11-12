import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
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

  form = this._formBuilder.group<LogInForm>({
    email: this._formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async onSubmit() {
    if (!this.form.valid) return;

    const authResponse = await this._authService.logIn({
      email: this.form.value.email!,
      password: this.form.value.password!,
    });

    this._router.navigate(['/']);

    console.log(authResponse);
  }
}
