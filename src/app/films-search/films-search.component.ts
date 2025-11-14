import { Component } from '@angular/core';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-films-search',
  imports: [SearchBarComponent],
  templateUrl: './films-search.component.html',
})
export class FilmsSearchComponent {}
