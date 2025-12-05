import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { ManageRaceComponent } from './admin/manage-race/manage-race.component';
import { DeletionConfirmationModalComponent } from '../shared/components/deletion-confirmation-modal/deletion-confirmation-modal.component';
import { EventMode } from '../shared/types/race.types';

@Injectable({
  providedIn: 'root',
})
export class GrandPrixModalService {
  private _dialog = inject(Dialog);

  openManageRaceModal(
    mode: EventMode,
    selectInfo?: DateSelectArg,
    eventId?: string
  ) {
    const modalRef = this._dialog.open(ManageRaceComponent, {
      data: {
        mode: mode,
        dateInfo: selectInfo,
        eventId: eventId,
      },
    });

    return modalRef.closed;
  }

  openDeleteConfirmation(deleteFn: () => Promise<void>) {
    const confirmRef = this._dialog.open(DeletionConfirmationModalComponent, {
      data: {
        functionOnConfirm: deleteFn,
        messageOnConfirm: 'The grand prix has been deleted successfully',
        deletionItemText: 'grand prix',
      },
    });

    return confirmRef.closed;
  }
}
