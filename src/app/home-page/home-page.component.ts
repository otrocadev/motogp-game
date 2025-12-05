import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth/data-access/auth.service';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserHomeComponent } from './user-home/user-home.component';

@Component({
  selector: 'app-home-page',
  imports: [HeroBannerComponent, AdminHomeComponent, UserHomeComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private _authService = inject(AuthService);

  authState = this._authService.isSessionActive;
  isAdmin = computed(() => this._authService.user()?.role === 'admin');
}
