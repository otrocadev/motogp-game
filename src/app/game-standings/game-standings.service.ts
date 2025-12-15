import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../shared/data-access/supabase.service';
import type { UserStanding } from './game-standing.types';

@Injectable({
  providedIn: 'root',
})
export class GameStandingsService {
  private _supabaseService = inject(SupabaseService);
  private _standings = signal<UserStanding[]>([]);

  standings = this._standings.asReadonly();

  async getStandings(): Promise<UserStanding[]> {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('game_standings')
      .select('*')
      .order('credits', { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    this._standings.set(data as UserStanding[]);
    return this.standings();
  }
}
