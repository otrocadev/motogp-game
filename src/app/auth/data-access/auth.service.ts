import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from '../../core/data-access/supabase.service';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _supabaseClient = inject(SupabaseService).supabaseClient;
  private _isSessionActive = signal(true);
  isSessionActive = this._isSessionActive.asReadonly();

  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }

  logIn(credentials: SignInWithPasswordCredentials) {
    this._isSessionActive.set(true);
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    this._isSessionActive.set(false);
    return this._supabaseClient.auth.signOut();
  }
}
