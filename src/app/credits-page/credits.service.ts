import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../shared/data-access/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CreditsService {
  private _supabaseService = inject(SupabaseService);

  async getLastUserCreditsEarned() {
    const {
      data: { user },
    } = await this._supabaseService.supabaseClient.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await this._supabaseService.supabaseClient
      .from('user_session_points')
      .select(
        `
        grand_prix_id,
        session_type,
        credits_earned,
        2026_grand_prixes(name, end_date)
      `
      )
      .eq('user_id', user.id)
      .limit(5);

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  }
}
