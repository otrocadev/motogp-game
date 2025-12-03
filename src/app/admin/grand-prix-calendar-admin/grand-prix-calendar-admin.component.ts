import { Component, signal, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { GrandPrixService } from '../../shared/data-access/grand-prix.service';
import { Dialog } from '@angular/cdk/dialog';
import { ManageRaceComponent } from '../manage-race/manage-race.component';
import { GrandPrixCardComponent } from '../../grand-prix-list/grand-prix-card/grand-prix-card.component';
import { EventMode } from '../../shared/types/race.types';
import { baseImgUrl } from '../../config/calendarView.config';

@Component({
  selector: 'app-grand-prix-calendar',
  imports: [CommonModule, FullCalendarModule, GrandPrixCardComponent],
  templateUrl: './grand-prix-calendar-admin.component.html',
})
export default class GrandPrixCalendarComponent {
  private _grandPrixService = inject(GrandPrixService);
  private _dialog = inject(Dialog);
  grandPrixEvents = this._grandPrixService.grandPrixCalendarEvents;
  baseImgUrl = baseImgUrl;

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    headerToolbar: {
      left: 'today',
      center: 'title',
      right: 'prev,next',
    },
    initialView: 'dayGridMonth',
    events: this.grandPrixEvents,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    firstDay: 1,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
    this.loadEvents();
  }

  async loadEvents() {
    const events = await this._grandPrixService.getGrandPrixCalendarEvents();

    this.calendarOptions.update((opts) => ({
      ...opts,
      events: events,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.openCreateEventModal('create', selectInfo);
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.openCreateEventModal('edit', undefined, clickInfo.event.id);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

  openCreateEventModal(
    mode: EventMode,
    selectInfo?: DateSelectArg,
    eventId?: string
  ) {
    const dialogRef = this._dialog.open(ManageRaceComponent, {
      data: {
        mode: mode,
        dateInfo: selectInfo,
        eventId: eventId,
      },
    });

    dialogRef.closed.subscribe((result) => {
      if (
        result === 'created' ||
        result === 'updated' ||
        result === 'deleted'
      ) {
        this.loadEvents();
      }
    });
  }
}
