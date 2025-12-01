import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { GrandPrixService } from '../../shared/data-access/grand-prix.service';
import { DeletionConfirmationModalComponent } from '../../shared/components/deletion-confirmation-modal/deletion-confirmation-modal.component';
import {
  EventMode,
  GrandPrixEvent,
  CreateRaceDialogData,
  CreateRaceForm,
} from '../../shared/types/race.types';

@Component({
  selector: 'app-manage-race',
  imports: [ReactiveFormsModule],
  templateUrl: './manage-race.component.html',
})
export class ManageRaceComponent {
  private _formBuilder = inject(FormBuilder);
  private _grandPrixService = inject(GrandPrixService);
  private _formMode = signal<EventMode>('create');
  dialogRef = inject(DialogRef);
  private _dialog = inject(Dialog);

  formMode = this._formMode.asReadonly();

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

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

  private createEventData(): GrandPrixEvent {
    const eventData = {
      name: this.form.value.name!.toUpperCase(),
      location: this.form.value.location!.toUpperCase(),
      circuit: this.form.value.circuit!.toUpperCase(),
      start_date: this.form.value.start_date!,
      end_date: this.form.value.end_date!,
    };
    return eventData;
  }

  private patchEventData(): GrandPrixEvent {
    const eventData = {
      id: this.data.eventId!,
      name: this.form.value.name!.toUpperCase(),
      location: this.form.value.location!.toUpperCase(),
      circuit: this.form.value.circuit!.toUpperCase(),
      start_date: this.form.value.start_date!,
      end_date: this.form.value.end_date!,
    };
    return eventData;
  }

  openDeleteConfirmationDialog(): void {
    const confirmDeletionRef = this._dialog.open(
      DeletionConfirmationModalComponent,
      {
        data: {
          functionOnConfirm: async () => {
            await this._grandPrixService.deleteGrandPrixInfoById(
              this.data.eventId!
            );
          },
          messageOnConfirm: 'The grand prix has been deleted successfully',
          deletionItemText: 'grand prix',
        },
      }
    );

    confirmDeletionRef.closed.subscribe((result) => {
      if (result === 'confirmed') {
        this.dialogRef.close('deleted');
      }
    });
  }

  async onSubmit() {
    if (this.data.mode === 'create') {
      this.isLoading.set(true);
      try {
        await this._grandPrixService.createGrandPrixEvent(
          this.createEventData()
        );
        this.dialogRef.close('created');
      } catch (error) {
        this.errorMessage.set('Error creating grand prix');
      } finally {
        this.isLoading.set(false);
      }
    } else if (this.data.mode === 'edit') {
      this.isLoading.set(true);
      try {
        await this._grandPrixService.updateGrandPrixInfoById(
          this.patchEventData()
        );
        this.dialogRef.close('updated');
      } catch (error) {
        this.errorMessage.set('Error updating grand prix');
      } finally {
        this.isLoading.set(false);
      }
    } else {
      console.error('Invalid mode');
    }
  }
}
