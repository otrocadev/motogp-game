import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../shared/data-access/supabase.service';
import { RiderInfo } from './rider.types';

@Injectable({
  providedIn: 'root',
})
export class RidersService {
  private _supabaseService = inject(SupabaseService);
  private _riders = signal<RiderInfo[]>([]);

  riders = this._riders.asReadonly();

  async getRiders(): Promise<void> {
    const { data, error } = await this._supabaseService.supabaseClient
      .from('riders_list')
      .select('*')
      .order('number', { ascending: false });

    if (error) {
      console.error(error);
      this._riders.set([]);
      return;
    }

    this._riders.set(data as RiderInfo[]);
  }
}
