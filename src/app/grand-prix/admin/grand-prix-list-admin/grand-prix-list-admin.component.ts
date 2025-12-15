import { Component, inject, input } from '@angular/core';
import { GrandPrixCardAdminComponent } from './grand-prix-card-admin/grand-prix-card-admin.component';
import { GrandPrixService } from '../../grand-prix.service';
import { GrandPrixModalService } from '../../grand-prix-modal.service';
import {
  GrandPrixCalendarEvent,
  EventMode,
} from '../../types/grand-prix.types';
import { DateSelectArg } from '@fullcalendar/core';

@Component({
  selector: 'app-grand-prix-list-admin',
  imports: [GrandPrixCardAdminComponent],
  templateUrl: './grand-prix-list-admin.component.html',
  styles: ``,
})
export class GrandPrixListAdminComponent {
  private _grandPrixService = inject(GrandPrixService);
  private _modalService = inject(GrandPrixModalService);
  displayingEvents = input<GrandPrixCalendarEvent[]>();

  constructor() {
    this.loadEvents();
  }

  async loadEvents() {
    await this._grandPrixService.getGrandPrixCalendarEvents();
  }

  openCreateEventModal(
    mode: EventMode,
    selectInfo?: DateSelectArg,
    eventId?: string
  ) {
    this._modalService
      .openManageRaceModal(mode, selectInfo, eventId)
      .subscribe((result) => {
        if (
          result === 'created' ||
          result === 'updated' ||
          result === 'deleted'
        ) {
          this.loadEvents();
        }
      });
  }

  openDeleteConfirmation(eventId: string) {
    this._modalService
      .openDeleteConfirmation(async () => {
        await this._grandPrixService.deleteGrandPrixInfoById(eventId);
      })
      .subscribe((result) => {
        if (result === 'confirmed') {
          this.loadEvents();
        }
      });
  }
}
