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
    const { data, error } = await this._supabaseService.supabaseClient
      .from('session_results')
      .insert(guessesData)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
