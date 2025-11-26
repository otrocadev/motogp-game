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

@Component({
  selector: 'app-grand-prix-calendar',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './grand-prix-calendar.component.html',
})
export default class GrandPrixCalendarComponent {
  private _grandPrixService = inject(GrandPrixService);

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    headerToolbar: {
      left: 'today',
      center: 'title',
      right: 'prev,next',
    },
    initialView: 'dayGridMonth',
    events: this._grandPrixService.grandPrixCalendarEvents(),
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
    // TODO: Use a modal to create a new event
  }

  handleEventClick(clickInfo: EventClickArg) {
    // TODO: Use a modal to edit the event
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }
}
