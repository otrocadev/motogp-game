import {
  Component,
  signal,
  ChangeDetectorRef,
  inject,
  input,
  effect,
} from '@angular/core';
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
import { GrandPrixService } from '../../grand-prix.service';
import { GrandPrixModalService } from '../../grand-prix-modal.service';
import {
  EventMode,
  GrandPrixCalendarEvent,
} from '../../../shared/types/race.types';
import { baseImgUrl } from '../../../config/endpoints';

@Component({
  selector: 'app-grand-prix-calendar-admin',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './grand-prix-calendar-admin.component.html',
})
export class GrandPrixCalendarAdminComponent {
  private _grandPrixService = inject(GrandPrixService);
  private _modalService = inject(GrandPrixModalService);
  displayingEvents = input<GrandPrixCalendarEvent[]>();
  baseImgUrl = baseImgUrl;

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    headerToolbar: {
      left: 'today',
      center: 'title',
      right: 'prev,next',
    },
    initialView: 'dayGridMonth',
    events: [],
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
    effect(() => {
      const events = this.displayingEvents();
      if (events && events.length > 0) {
        this.calendarOptions.update((opts) => ({
          ...opts,
          events: events,
        }));
      }
    });
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

  openDeleteConfirmation(eventId: string) {
    this._modalService
      .openDeleteConfirmation(async () => {
        await this._grandPrixService.deleteGrandPrixInfoById(eventId);
      })
      .subscribe();
  }

  openCreateEventModal(
    mode: EventMode,
    selectInfo?: DateSelectArg,
    eventId?: string
  ) {
    this._modalService
      .openManageRaceModal(mode, selectInfo, eventId)
      .subscribe();
  }
}
