import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../shared/data-access/supabase.service';
import { StandingInfo } from '../shared/types/standing.types';

@Injectable({
  providedIn: 'root',
})
export class MotogpStandingsService {
  private _supabaseService = inject(SupabaseService);
  private _standings = signal<StandingInfo[]>([]);

  standings = this._standings.asReadonly();

  async getStandings(): Promise<StandingInfo[]> {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('2026_standings_view')
      .select('*')
      .order('points', { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    this._standings.set(data as StandingInfo[]);
    return this.standings();
  }
}
