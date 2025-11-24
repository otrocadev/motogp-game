import { Injectable, inject, signal } from '@angular/core';
import { OMDBService } from '../../shared/data-access/omdb.service';
import type { SearchResult } from '../../shared/types/movieTypes';

@Injectable({
  providedIn: 'root',
})
export class SearchMovieService {
  private _omdbService = inject(OMDBService);
  private _searchInput = signal('');
  private _moviesList = signal<SearchResult[]>([]);
  private _errorMessage = signal<string | null>(null);
  private _isLoading = signal(false);
  private _currentPage = signal(1);
  private _totalResults = signal(0);
  private _hasMore = signal(true);

  searchInput = this._searchInput.asReadonly();
  moviesList = this._moviesList.asReadonly();
  errorMessage = this._errorMessage.asReadonly();
  isLoading = this._isLoading.asReadonly();
  hasMore = this._hasMore.asReadonly();

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

    if (response.totalResults) {
      this._totalResults.set(parseInt(response.totalResults, 10));
    }

    const transformedList = response.Search.map((movie: any) => ({
      title: movie.Title || 'Unknown Title',
      poster: movie.Poster || '',
      year: movie.Year || 'Unknown Year',
      imdbID: movie.imdbID || '',
    }));

    return transformedList;
  }

  searchMovies(input: string) {
    this.updateSearchInput(input);
    this._errorMessage.set(null);
    this._isLoading.set(true);
    this._currentPage.set(1);
    this._hasMore.set(true);

    this._omdbService.fetchMovies(input, 1).subscribe({
      next: (response) => {
        const processedData = this.manageMovieListData(response);
        this._moviesList.set(processedData);
        this._isLoading.set(false);

        const totalPages = Math.ceil(this._totalResults() / 10);
        this._hasMore.set(this._currentPage() < totalPages);
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

  loadMoreMovies() {
    if (!this._hasMore() || this._isLoading()) {
      return;
    }

    const nextPage = this._currentPage() + 1;
    this._isLoading.set(true);

    this._omdbService.fetchMovies(this._searchInput(), nextPage).subscribe({
      next: (response) => {
        const processedData = this.manageMovieListData(response);
        this._moviesList.set([...this._moviesList(), ...processedData]);
        this._currentPage.set(nextPage);
        this._isLoading.set(false);

        const totalPages = Math.ceil(this._totalResults() / 10);
        this._hasMore.set(nextPage < totalPages);
      },
      error: (error) => {
        console.error('HTTP Error:', error);
        this._isLoading.set(false);
      },
    });
  }
}
