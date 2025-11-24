import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { environment } from '../../../environments/environment';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _supabaseClient = inject(SupabaseService).supabaseClient;
  private _isSessionActive = signal<boolean | null>(null);

  isSessionActive = this._isSessionActive.asReadonly();

  constructor() {
    this._supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') this._isSessionActive.set(false);
      if (event === 'SIGNED_IN') this._isSessionActive.set(true);
    });
  }

  session() {
    return this._supabaseClient.auth.getSession();
  }

  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }

  logIn(credentials: SignInWithPasswordCredentials) {
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this._supabaseClient.auth.signOut();
  }
}
