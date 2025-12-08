import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../shared/data-access/supabase.service';
import { StandingInfo } from '../shared/types/standing.types';
import { Top5StandingInfo } from '../shared/types/standing.types';

@Injectable({
  providedIn: 'root',
})
export class MotogpStandingsService {
  private _supabaseService = inject(SupabaseService);
  private _standings = signal<StandingInfo[]>([]);
  private _top5Standings = signal<Top5StandingInfo[]>([]);

  standings = this._standings.asReadonly();
  top5Standings = this._top5Standings.asReadonly();

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

  async getTop5Standings(): Promise<Top5StandingInfo[]> {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('top5_standings')
      .select('*')
      .order('points', { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    this._top5Standings.set(data as Top5StandingInfo[]);
    return this.top5Standings();
  }
}
