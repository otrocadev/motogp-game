import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../shared/data-access/supabase.service';
import { EventInput } from '@fullcalendar/core';
import {
  GrandPrixEvent,
  GrandPrixCalendarEvent,
} from '../shared/types/race.types';

@Injectable({
  providedIn: 'root',
})
export class GrandPrixService {
  private _supabaseService = inject(SupabaseService);
  private _grandPrixCalendarEvents = signal<GrandPrixCalendarEvent[]>([]);

  grandPrixCalendarEvents = this._grandPrixCalendarEvents.asReadonly();

  async getGrandPrixCalendarEvents() {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('2026_grand_prixes')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error(error);
      return [];
    }

    const calendarEvents = data.map((event) => {
      const end = new Date(`${event.end_date}T00:00:00Z`);
      // This is because the end date is not included in the event by the calendar library
      end.setUTCDate(end.getUTCDate() + 1);
      const endStr = end.toISOString().slice(0, 10);

      return {
        id: event.id,
        title: event.name,
        start: event.start_date,
        flag_img: event.flag_img,
        location: event.location,
        circuit: event.circuit,
        latitude: event.latitude,
        longitude: event.longitude,
        end: endStr,
        allDay: true,
      };
    });

    this._grandPrixCalendarEvents.set(calendarEvents);
    return this._grandPrixCalendarEvents();
  }

  async getGrandPrixInfoById(id: string) {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('2026_grand_prixes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }

  async updateGrandPrixInfoById(eventData: GrandPrixEvent) {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('2026_grand_prixes')
      .update(eventData)
      .eq('id', eventData.id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  async createGrandPrixEvent(eventData: GrandPrixEvent) {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('2026_grand_prixes')
      .insert(eventData)
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }

  async deleteGrandPrixInfoById(id: string) {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('2026_grand_prixes')
      .delete()
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  }
}
