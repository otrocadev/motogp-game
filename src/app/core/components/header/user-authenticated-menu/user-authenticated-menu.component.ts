import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/data-access/auth.service';

@Component({
  selector: 'app-user-authenticated-menu',
  imports: [],
  templateUrl: './user-authenticated-menu.component.html',
  styles: ``,
})
export class UserAuthenticatedMenuComponent {
  private _authService = inject(AuthService);

  signOut() {
    this._authService.signOut();
  }
}
