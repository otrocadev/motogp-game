import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-authenticated-menu',
  imports: [],
  templateUrl: './user-authenticated-menu.component.html',
  styles: ``,
})
export class UserAuthenticatedMenuComponent {
  private _router = inject(Router);
  authService = inject(AuthService);
  isDropdownOpen = false;

  async signOut() {
    await this.authService.signOut();
    this._router.navigate(['/auth/log-in']);
  }
}
