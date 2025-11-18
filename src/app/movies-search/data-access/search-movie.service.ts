import { Injectable, inject, signal } from '@angular/core';
import { OMDBService } from '../../shared/data-access/omdb.service';
import type { SearchResult } from '../types/movieResultsType';

@Injectable({
  providedIn: 'root',
})
export class SearchMovieService {
  private _omdbService = inject(OMDBService);
  private _searchInput = signal('');
  private _moviesList = signal<SearchResult[]>([]);
  private _errorMessage = signal<string | null>(null);
  private _isLoading = signal(false);

  searchInput = this._searchInput.asReadonly();
  moviesList = this._moviesList.asReadonly();
  errorMessage = this._errorMessage.asReadonly();
  isLoading = this._isLoading.asReadonly();

  updateSearchInput(input: string) {
    this._searchInput.set(input);
  }

  manageMovieListData(response: any): SearchResult[] {
    if (response && response.Response === 'False' && response.Error) {
      console.warn('API Error:', response.Error);
      this._errorMessage.set(response.Error);
      return [];
    }

    if (!response || !response.Search || !Array.isArray(response.Search)) {
      console.warn('Invalid response structure:', response);
      this._errorMessage.set('Unable to fetch movies. Please try again later.');
      return [];
    }

    this._errorMessage.set(null);

    const transformedList = response.Search.map((movie: any) => ({
      title: movie.Title || 'Unknown Title',
      poster: movie.Poster || '',
      year: movie.Year || 'Unknown Year',
    }));

    return transformedList;
  }

  searchMovies(input: string) {
    this.updateSearchInput(input);
    this._errorMessage.set(null);
    this._isLoading.set(true);

    this._omdbService.fetchMovies(input).subscribe({
      next: (response) => {
        const processedData = this.manageMovieListData(response);
        this._moviesList.set(processedData);
        this._isLoading.set(false);
      },
      error: (error) => {
        console.error('HTTP Error:', error);
        this._errorMessage.set(
          'Network error. Please check your connection and try again.'
        );
        this._moviesList.set([]);
        this._isLoading.set(false);
      },
    });
  }
}
