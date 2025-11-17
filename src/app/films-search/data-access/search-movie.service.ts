import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchMovieService {
  private _searchInput = signal('');
  searchInput = this._searchInput.asReadonly();

  updateSearchInput(input: string) {
    this._searchInput.set(input);
    console.log('Updated search input:', this._searchInput());
  }

  searchForResults() {
    console.log(this._searchInput());
  }
}
