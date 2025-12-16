import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from '../auth/data-access/auth.service';
import { SupabaseService } from '../shared/data-access/supabase.service';
import { UserGuess, AdminGuess } from './types/guess.types';

@Injectable({
  providedIn: 'root',
})
export class GrandPrixSessionService {
  private _authService = inject(AuthService);
  private _supabaseService = inject(SupabaseService);

  // validation of the admin PENDING to do their things in case of necessary
  isUserAdmin = signal<boolean>(false);

  async submitSessionGuesses(guessesData: UserGuess[]) {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('user_guesses')
      .insert(guessesData)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async submitSessionResults(guessesData: AdminGuess[]) {
    console.log('Sending data:', JSON.stringify(guessesData, null, 2));

    const { error: insertError, data: insertedData } =
      await this._supabaseService.supabaseClient
        .from('session_results')
        .insert(guessesData)
        .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error(insertError.message);
    }

    if (insertedData && insertedData.length > 0) {
      for (const result of insertedData) {
        const { data: pointsData } = await this._supabaseService.supabaseClient
          .from('points_config')
          .select('points')
          .eq('session_type', result.session_type)
          .eq('position', result.position)
          .single();

        if (pointsData?.points) {
          const { data: existingRider } =
            await this._supabaseService.supabaseClient
              .from('2026_standings')
              .select('id, races, points')
              .eq('id', result.rider)
              .single();

          if (existingRider) {
            await this._supabaseService.supabaseClient
              .from('2026_standings')
              .update({
                races: (existingRider.races || 0) + 1,
                points: (existingRider.points || 0) + pointsData.points,
              })
              .eq('id', result.rider);
          } else {
            await this._supabaseService.supabaseClient
              .from('2026_standings')
              .insert({
                id: result.rider,
                races: 1,
                points: pointsData.points,
              });
          }
        }
      }
    }

    return guessesData;
  }
}
