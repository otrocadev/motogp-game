import { Component, inject, HostListener } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchMovieService } from '../data-access/search-movie.service';
import { MovieResultCardComponent } from './movie-result-card/movie-result-card.component';

@Component({
  selector: 'app-movies-search',
  imports: [SearchBarComponent, MovieResultCardComponent],
  templateUrl: './movies-search.component.html',
})
export class MoviesSearchComponent {
  private _searchMovieService = inject(SearchMovieService);

  searchInput = this._searchMovieService.searchInput;
  moviesList = this._searchMovieService.moviesList;
  errorMessage = this._searchMovieService.errorMessage;
  isLoading = this._searchMovieService.isLoading;
  hasMore = this._searchMovieService.hasMore;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 200;

    if (scrollPosition >= threshold && this.hasMore() && !this.isLoading()) {
      this._searchMovieService.loadMoreMovies();
    }
  }
}
