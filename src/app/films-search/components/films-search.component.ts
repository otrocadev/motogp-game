import { Component, inject } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchMovieService } from '../data-access/search-movie.service';

@Component({
  selector: 'app-films-search',
  imports: [SearchBarComponent],
  templateUrl: './films-search.component.html',
})
export class FilmsSearchComponent {
  private _searchMovieService = inject(SearchMovieService);

  searchInput = this._searchMovieService.searchInput();
}
