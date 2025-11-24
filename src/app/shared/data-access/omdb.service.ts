import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OMDBService {
  private _OMDB_API_URL = environment.OMDB_API_URL;
  private _OMDB_API_KEY = environment.OMDB_API_KEY;

  constructor(private http: HttpClient) {}

  fetchMovies(searchInput: string, page: number = 1) {
    try {
      const params = new HttpParams({
        fromObject: {
          apikey: this._OMDB_API_KEY,
          s: searchInput,
          page: page.toString(),
        },
      });

      return this.http.get(this._OMDB_API_URL, { params });
    } catch (error) {
      throw error;
    }
  }

  fetchMovieById(id: string) {
    try {
      const params = new HttpParams({
        fromObject: {
          apikey: this._OMDB_API_KEY,
          i: id,
        },
      });

      return this.http.get(this._OMDB_API_URL, { params });
    } catch (error) {
      throw error;
    }
  }
}
