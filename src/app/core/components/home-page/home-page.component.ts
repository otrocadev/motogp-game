import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { FilmsSearchComponent } from '../../../films-search/films-search.component';

@Component({
  selector: 'app-home-page',
  imports: [FilmsSearchComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private _authService = inject(AuthService);

  authState = this._authService.isSessionActive;
}
