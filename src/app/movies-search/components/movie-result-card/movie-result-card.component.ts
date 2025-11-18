import { Component, computed, input } from '@angular/core';
import { SearchResult } from '../../types/movieResultsType';

@Component({
  selector: 'app-movie-result-card',
  imports: [],
  templateUrl: './movie-result-card.component.html',
})
export class MovieResultCardComponent {
  movie = input<SearchResult>();

  title = computed(() => this.movie()?.title || 'Unknown Title');
  year = computed(() => this.movie()?.year || 'Unknown Year');
  poster = computed(() => this.movie()?.poster || '');
}
