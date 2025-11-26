import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';

interface CreateRaceForm {
  name: FormControl<string | null>;
  location: FormControl<string | null>;
  circuit: FormControl<string | null>;
}

@Component({
  selector: 'app-create-race',
  imports: [ReactiveFormsModule],
  templateUrl: './create-race.component.html',
})
export default class CreateRaceComponent {
  private _formBuilder = inject(FormBuilder);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  form = this._formBuilder.group<CreateRaceForm>({
    name: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    location: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    circuit: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit() {}
}
