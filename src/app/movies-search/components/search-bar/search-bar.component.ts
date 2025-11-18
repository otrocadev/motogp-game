import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchMovieService } from '../../data-access/search-movie.service';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styles: ``,
})
export class SearchBarComponent {
  private _searchMovieService = inject(SearchMovieService);
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group({
    searchInput: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit() {
    this._searchMovieService.searchMovies(this.form.value.searchInput!);
  }
}
