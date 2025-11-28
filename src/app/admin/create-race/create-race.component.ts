import { Component, Inject, inject, signal } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { GrandPrixService } from '../../shared/data-access/grand-prix.service';
import {
  EventMode,
  GrandPrixEvent,
  CreateRaceDialogData,
} from './create-race-types';

interface CreateRaceForm {
  name: FormControl<string | null>;
  location: FormControl<string | null>;
  circuit: FormControl<string | null>;
  start_date: FormControl<string | null>;
  end_date: FormControl<string | null>;
}

@Component({
  selector: 'app-create-race',
  imports: [ReactiveFormsModule],
  templateUrl: './create-race.component.html',
})
export class CreateRaceComponent {
  private _formBuilder = inject(FormBuilder);
  private _grandPrixService = inject(GrandPrixService);

  private _formMode = signal<EventMode>('create');
  formMode = this._formMode.asReadonly();

  constructor(@Inject(DIALOG_DATA) public data: CreateRaceDialogData) {
    this._formMode.set(data.mode);

    if (this._formMode() === 'create') {
      try {
        this.addNewEventDates(data.dateInfo!);
      } catch (error) {
        console.error(error);
      }
    }

    if (this._formMode() === 'edit') {
      try {
        this.getGrandPrixInfoById(data.eventId!);
      } catch (error) {
        console.error(error);
      }
    }
  }

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  private addNewEventDates(datesInfo: DateSelectArg) {
    const dates = datesInfo;

    // This is because the end date is not included in the event by the calendar library
    const end = new Date(dates.endStr);
    end.setDate(end.getDate() - 1);

    this.form.patchValue({
      start_date: dates.startStr,
      end_date: end.toISOString().slice(0, 10),
    });
  }

  private async getGrandPrixInfoById(id: string) {
    const grandPrixInfo = await this._grandPrixService.getGrandPrixInfoById(id);

    const start = new Date(grandPrixInfo.start_date);
    const end = new Date(grandPrixInfo.end_date);

    this.form.patchValue({
      name: grandPrixInfo.name,
      location: grandPrixInfo.location,
      circuit: grandPrixInfo.circuit,
      start_date: start.toISOString().slice(0, 10),
      end_date: end.toISOString().slice(0, 10),
    });
  }

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
    start_date: this._formBuilder.control<string | null>(null, [
      Validators.required,
    ]),
    end_date: this._formBuilder.control<string | null>(null, [
      Validators.required,
    ]),
  });

  private createEventData(): GrandPrixEvent {
    const eventData = {
      name: this.form.value.name!,
      location: this.form.value.location!,
      circuit: this.form.value.circuit!,
      start_date: this.form.value.start_date!,
      end_date: this.form.value.end_date!,
    };
    return eventData;
  }
  private patchEventData(): GrandPrixEvent {
    const eventData = {
      id: this.data.eventId!,
      name: this.form.value.name!,
      location: this.form.value.location!,
      circuit: this.form.value.circuit!,
      start_date: this.form.value.start_date!,
      end_date: this.form.value.end_date!,
    };
    return eventData;
  }

  onSubmit() {
    if (this.data.mode === 'create') {
      this.createEventData();
    } else if (this.data.mode === 'edit') {
      console.log(this.patchEventData());
      this._grandPrixService.updateGrandPrixInfoById(this.patchEventData());
    } else {
      console.error('Invalid mode');
    }
  }
}
