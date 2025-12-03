import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { GrandPrixService } from '../../grand-prix.service';
import {
  EventMode,
  GrandPrixEvent,
  CreateRaceDialogData,
  CreateRaceForm,
} from '../../../shared/types/race.types';
import { MapboxViewComponent } from '../../../shared/components/mapbox-view/mapbox-view.component';
import { UploadImageService } from '../../../shared/data-access/upload-image.service';
import { ToastNotificationService } from '../../../shared/components/toast-notification/toast-notification.service';

@Component({
  selector: 'app-manage-race',
  imports: [ReactiveFormsModule, MapboxViewComponent],
  templateUrl: './manage-race.component.html',
})
export class ManageRaceComponent {
  private _formBuilder = inject(FormBuilder);
  private _formMode = signal<EventMode>('create');
  private _grandPrixService = inject(GrandPrixService);
  private toastNotificationService = inject(ToastNotificationService);
  private uploadImageService = inject(UploadImageService);
  dialogRef = inject(DialogRef);

  formMode = this._formMode.asReadonly();
  filePath = signal<string>('');

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

  mapboxPosition = signal<[number, number]>([2.26, 41.57]);

  onPositionChange([lng, lat]: [number, number]) {
    this.mapboxPosition.set([lng, lat]);
  }

  async onFlagSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const path = await this.uploadImageService.uploadImage(file, 'flags');

    if (path) {
      this.filePath.set(path);
    }
  }

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

    this.mapboxPosition.set([grandPrixInfo.longitude, grandPrixInfo.latitude]);
    this.filePath.set(grandPrixInfo.flag_img);
  }

  private createEventData(): GrandPrixEvent {
    const eventData = {
      name: this.form.value.name!.toUpperCase(),
      location: this.form.value.location!.toUpperCase(),
      circuit: this.form.value.circuit!.toUpperCase(),
      start_date: this.form.value.start_date!,
      end_date: this.form.value.end_date!,
      longitude: this.mapboxPosition()[0],
      latitude: this.mapboxPosition()[1],
      flag_img: this.filePath()!,
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
      longitude: this.mapboxPosition()[0],
      latitude: this.mapboxPosition()[1],
      flag_img: this.filePath(),
    };
    return eventData;
  }

  async onSubmit() {
    if (this.data.mode === 'create') {
      this.isLoading.set(true);
      try {
        await this._grandPrixService.createGrandPrixEvent(
          this.createEventData()
        );
        this.toastNotificationService.show('Grand prix created successfully');
        this.dialogRef.close('created');
      } catch (error) {
        this.errorMessage.set('Error creating grand prix');
        this.toastNotificationService.show('Error creating grand prix');
      } finally {
        this.isLoading.set(false);
      }
    } else if (this.data.mode === 'edit') {
      this.isLoading.set(true);
      try {
        await this._grandPrixService.updateGrandPrixInfoById(
          this.patchEventData()
        );
        this.toastNotificationService.show('Grand prix updated successfully');
        this.dialogRef.close('updated');
      } catch (error) {
        this.errorMessage.set('Error updating grand prix');
        this.toastNotificationService.show('Error updating grand prix');
      } finally {
        this.isLoading.set(false);
      }
    } else {
      console.error('Invalid mode');
    }
  }
}
