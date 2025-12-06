import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ManageRaceComponent } from './manage-race.component';
import { GrandPrixService } from '../../grand-prix.service';
import { ToastNotificationService } from '../../../shared/components/toast-notification/toast-notification.service';
import { UploadImageService } from '../../../shared/data-access/upload-image.service';

describe('ManageRaceComponent', () => {
  let component: ManageRaceComponent;
  let gpServiceMock: jasmine.SpyObj<GrandPrixService>;
  let dialogRefMock: jasmine.SpyObj<DialogRef<any>>;
  let toastMock: jasmine.SpyObj<ToastNotificationService>;
  let uploadMock: jasmine.SpyObj<UploadImageService>;

  beforeEach(() => {
    gpServiceMock = jasmine.createSpyObj('GrandPrixService', [
      'createGrandPrixEvent',
      'updateGrandPrixInfoById',
      'getGrandPrixInfoById',
    ]);
    dialogRefMock = jasmine.createSpyObj('DialogRef', ['close']);
    toastMock = jasmine.createSpyObj('ToastNotificationService', ['show']);
    uploadMock = jasmine.createSpyObj('UploadImageService', ['uploadImage']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        ManageRaceComponent,
        { provide: GrandPrixService, useValue: gpServiceMock },
        { provide: DialogRef, useValue: dialogRefMock },
        { provide: ToastNotificationService, useValue: toastMock },
        { provide: UploadImageService, useValue: uploadMock },
        {
          provide: DIALOG_DATA,
          useValue: {
            mode: 'create',
            dateInfo: { startStr: '2026-06-05', endStr: '2026-06-08' },
          },
        },
      ],
    });

    component = TestBed.inject(ManageRaceComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('builds createEventData with uppercased fields', () => {
    component.form.setValue({
      name: 'catalunya',
      location: 'barcelona',
      circuit: 'circuit de catalunya',
      start_date: '2026-06-05',
      end_date: '2026-06-07',
    });
    component.mapboxPosition.set([2.26, 41.57]);
    component.filePath.set('/flags/cat.svg');

    const event = (component as any).createEventData();

    expect(event.name).toBe('CATALUNYA');
    expect(event.location).toBe('BARCELONA');
    expect(event.circuit).toBe('CIRCUIT DE CATALUNYA');
    expect(event.start_date).toBe('2026-06-05');
    expect(event.end_date).toBe('2026-06-07');
    expect(event.longitude).toBe(2.26);
    expect(event.latitude).toBe(41.57);
    expect(event.flag_img).toBe('/flags/cat.svg');
  });

  it('builds patchEventData keeping flag_img from filePath', () => {
    // Simulate edit mode
    (component as any).data = { mode: 'edit', eventId: '1' };
    component.form.setValue({
      name: 'catalunya',
      location: 'barcelona',
      circuit: 'circuit de catalunya',
      start_date: '2026-06-05',
      end_date: '2026-06-07',
    });
    component.mapboxPosition.set([2.26, 41.57]);
    component.filePath.set('/flags/original.svg');

    const event = (component as any).patchEventData();

    expect(event.id).toBe('1');
    expect(event.name).toBe('CATALUNYA');
    expect(event.flag_img).toBe('/flags/original.svg');
  });

  it('calls createGrandPrixEvent and closes dialog on create submit', async () => {
    gpServiceMock.createGrandPrixEvent.and.resolveTo({} as any);

    component.form.setValue({
      name: 'catalunya',
      location: 'barcelona',
      circuit: 'circuit de catalunya',
      start_date: '2026-06-05',
      end_date: '2026-06-07',
    });
    component.mapboxPosition.set([2.26, 41.57]);
    component.filePath.set('/flags/cat.svg');

    await component.onSubmit();

    expect(gpServiceMock.createGrandPrixEvent).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalledWith('created');
    expect(toastMock.show).toHaveBeenCalledWith(
      'Grand prix created successfully'
    );
  });

  it('calls updateGrandPrixInfoById and closes dialog on edit submit', async () => {
    // Reconfigure for edit mode
    (component as any).data = { mode: 'edit', eventId: '1' };
    (component as any)._formMode.set('edit');

    gpServiceMock.updateGrandPrixInfoById.and.resolveTo({} as any);

    component.form.setValue({
      name: 'catalunya',
      location: 'barcelona',
      circuit: 'circuit de catalunya',
      start_date: '2026-06-05',
      end_date: '2026-06-07',
    });
    component.mapboxPosition.set([2.26, 41.57]);
    component.filePath.set('/flags/cat.svg');

    await component.onSubmit();

    expect(gpServiceMock.updateGrandPrixInfoById).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalledWith('updated');
    expect(toastMock.show).toHaveBeenCalledWith(
      'Grand prix updated successfully'
    );
  });

  it('shows error message and does not close dialog on create error', async () => {
    gpServiceMock.createGrandPrixEvent.and.rejectWith(new Error('DB error'));

    component.form.setValue({
      name: 'catalunya',
      location: 'barcelona',
      circuit: 'circuit de catalunya',
      start_date: '2026-06-05',
      end_date: '2026-06-07',
    });
    component.mapboxPosition.set([2.26, 41.57]);
    component.filePath.set('/flags/cat.svg');

    await component.onSubmit();

    expect(component.errorMessage()).toBe('Error creating grand prix');
    expect(toastMock.show).toHaveBeenCalledWith('Error creating grand prix');
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('shows error message and does not close dialog on update error', async () => {
    // Reconfigure for edit mode
    (component as any).data = { mode: 'edit', eventId: '1' };
    (component as any)._formMode.set('edit');

    gpServiceMock.updateGrandPrixInfoById.and.rejectWith(new Error('DB error'));

    component.form.setValue({
      name: 'catalunya',
      location: 'barcelona',
      circuit: 'circuit de catalunya',
      start_date: '2026-06-05',
      end_date: '2026-06-07',
    });
    component.mapboxPosition.set([2.26, 41.57]);
    component.filePath.set('/flags/cat.svg');

    await component.onSubmit();

    expect(component.errorMessage()).toBe('Error updating grand prix');
    expect(toastMock.show).toHaveBeenCalledWith('Error updating grand prix');
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('sets isLoading to true during submit and false after', async () => {
    gpServiceMock.createGrandPrixEvent.and.resolveTo({} as any);

    component.form.setValue({
      name: 'catalunya',
      location: 'barcelona',
      circuit: 'circuit de catalunya',
      start_date: '2026-06-05',
      end_date: '2026-06-07',
    });
    component.mapboxPosition.set([2.26, 41.57]);
    component.filePath.set('/flags/cat.svg');

    expect(component.isLoading()).toBe(false);

    const submitPromise = component.onSubmit();

    // During the async operation, isLoading should be true
    expect(component.isLoading()).toBe(true);

    await submitPromise;

    expect(component.isLoading()).toBe(false);
  });
});
