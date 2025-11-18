import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/data-access/auth.service';
import { MoviesSearchComponent } from '../../../movies-search/components/movies-search.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';

@Component({
  selector: 'app-home-page',
  imports: [MoviesSearchComponent, HeroBannerComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private _authService = inject(AuthService);

  authState = this._authService.isSessionActive;
}
