import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/data-access/auth.service';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { BentoHomeGridComponent } from './bento-home-grid/bento-home-grid.component';

@Component({
  selector: 'app-home-page',
  imports: [HeroBannerComponent, BentoHomeGridComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private _authService = inject(AuthService);

  authState = this._authService.isSessionActive;
}
