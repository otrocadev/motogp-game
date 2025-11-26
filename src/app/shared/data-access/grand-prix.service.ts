import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../auth/data-access/supabase.service';
import { EventInput } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root',
})
export class GrandPrixService {
  private _supabaseService = inject(SupabaseService);
  private _grandPrixCalendarEvents = signal<EventInput[]>([]);

  grandPrixCalendarEvents = this._grandPrixCalendarEvents.asReadonly();

  async getGrandPrixCalendarEvents() {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('2026_grand_prixes')
      .select('*');

    if (error) {
      console.error(error);
      return [];
    }

    const calendarEvents = data.map((event) => {
      const end = new Date(event.end_date);
      // This is because the end date is not included in the event by the calendar library
      end.setDate(end.getDate() + 1);

      return {
        id: event.id,
        title: event.name,
        start: event.start_date,
        end: end.toISOString().slice(0, 10),
        allDay: true,
      };
    });

    this._grandPrixCalendarEvents.set(calendarEvents);
    return this._grandPrixCalendarEvents();
  }
}
