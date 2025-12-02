import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  private _supabaseService = inject(SupabaseService);

  async uploadImage(file: File, imageCat: string) {
    const filePath = `${imageCat}/${file.name}`;

    const { data, error } = await this._supabaseService.supabaseClient.storage
      .from('images')
      .upload(filePath, file);

    if (error) {
      console.error(error);
      return null;
    }

    return filePath;
  }
}
