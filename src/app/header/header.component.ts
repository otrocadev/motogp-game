import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/data-access/auth.service';
import { NotAuthenticatedMenuComponent } from './not-authenticated-menu/not-authenticated-menu.component';
import { UserAuthenticatedMenuComponent } from './user-authenticated-menu/user-authenticated-menu.component';

@Component({
  selector: 'app-header',
  imports: [NotAuthenticatedMenuComponent, UserAuthenticatedMenuComponent],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  private _authService = inject(AuthService);
  isSessionActive = this._authService.isSessionActive;
}
