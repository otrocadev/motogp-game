// import { Component, signal, ChangeDetectorRef, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import {
//   CalendarOptions,
//   DateSelectArg,
//   EventClickArg,
//   EventApi,
// } from '@fullcalendar/core';
// import interactionPlugin from '@fullcalendar/interaction';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import { GrandPrixService } from '../../grand-prix.service';
// import { GrandPrixModalService } from '../../grand-prix-modal.service';
// import { EventMode } from '../../../shared/types/race.types';
// import { baseImgUrl } from '../../../config/endpoints';

// @Component({
//   selector: 'app-grand-prix-calendar',
//   imports: [CommonModule, FullCalendarModule],
//   templateUrl: './grand-prix-calendar-admin.component.html',
// })
// export default class GrandPrixCalendarComponent {
//   private _grandPrixService = inject(GrandPrixService);
//   private _modalService = inject(GrandPrixModalService);
//   grandPrixEvents = this._grandPrixService.grandPrixCalendarEvents;
//   baseImgUrl = baseImgUrl;

//   calendarOptions = signal<CalendarOptions>({
//     plugins: [interactionPlugin, dayGridPlugin],
//     headerToolbar: {
//       left: 'today',
//       center: 'title',
//       right: 'prev,next',
//     },
//     initialView: 'dayGridMonth',
//     events: this.grandPrixEvents,
//     weekends: true,
//     editable: true,
//     selectable: true,
//     selectMirror: true,
//     dayMaxEvents: true,
//     firstDay: 1,
//     select: this.handleDateSelect.bind(this),
//     eventClick: this.handleEventClick.bind(this),
//     eventsSet: this.handleEvents.bind(this),
//   });
//   currentEvents = signal<EventApi[]>([]);

//   constructor(private changeDetector: ChangeDetectorRef) {
//     this.loadEvents();
//   }

//   async loadEvents() {
//     const events = await this._grandPrixService.getGrandPrixCalendarEvents();

//     this.calendarOptions.update((opts) => ({
//       ...opts,
//       events: events,
//     }));
//   }

//   handleDateSelect(selectInfo: DateSelectArg) {
//     this.openCreateEventModal('create', selectInfo);
//   }

//   handleEventClick(clickInfo: EventClickArg) {
//     this.openCreateEventModal('edit', undefined, clickInfo.event.id);
//   }

//   handleEvents(events: EventApi[]) {
//     this.currentEvents.set(events);
//     this.changeDetector.detectChanges();
//   }

//   openDeleteConfirmation(eventId: string) {
//     this._modalService
//       .openDeleteConfirmation(async () => {
//         await this._grandPrixService.deleteGrandPrixInfoById(eventId);
//       })
//       .subscribe((result) => {
//         if (result === 'confirmed') {
//           this.loadEvents();
//         }
//       });
//   }

//   openCreateEventModal(
//     mode: EventMode,
//     selectInfo?: DateSelectArg,
//     eventId?: string
//   ) {
//     this._modalService
//       .openManageRaceModal(mode, selectInfo, eventId)
//       .subscribe((result) => {
//         if (
//           result === 'created' ||
//           result === 'updated' ||
//           result === 'deleted'
//         ) {
//           this.loadEvents();
//         }
//       });
//   }
// }
