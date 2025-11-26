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
  private _user = signal<{
    id: string;
    email: string | null;
    username: string | null;
    name: string | null;
    surname: string | null;
    role: 'admin' | 'user' | null;
  } | null>(null);

  isSessionActive = this._isSessionActive.asReadonly();
  user = this._user.asReadonly();

  constructor() {
    this._supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') this._isSessionActive.set(false);
      if (event === 'SIGNED_IN') this._isSessionActive.set(true);

      this.updateUserInfo(session?.user?.id);
    });
  }

  async updateUserInfo(userId: string | undefined) {
    const { data, error, status } = await this._supabaseClient
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      this._user.set(null);
      return;
    }

    if (data?.role === 'admin') {
      this._user.set({
        id: data.id,
        email: data.email,
        username: data.username,
        name: data.name,
        surname: data.surname,
        role: 'admin',
      });
    } else {
      this._user.set({
        id: data.id,
        email: data.email,
        username: data.username,
        name: data.name,
        surname: data.surname,
        role: 'user',
      });
    }
  }

  async session() {
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
