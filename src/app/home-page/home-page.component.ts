import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../auth/data-access/auth.service';
import { Router } from '@angular/router';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { UserHomeComponent } from './user-home/user-home.component';

@Component({
  selector: 'app-home-page',
  imports: [HeroBannerComponent, UserHomeComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  authState = this._authService.isSessionActive;
  isAdmin = computed(() => this._authService.user()?.role === 'admin');

  redirectIfAdmin = effect(() => {
    if (!this.authState()) {
      return;
    }
    if (this.isAdmin()) {
      this._router.navigate(['/admin/home']);
    } else {
      this._router.navigate(['/home']);
    }
  });
}
