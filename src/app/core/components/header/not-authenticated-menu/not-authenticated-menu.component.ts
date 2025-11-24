import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authenticated-menu',
  imports: [],
  templateUrl: './not-authenticated-menu.component.html',
  styles: ``,
})
export class NotAuthenticatedMenuComponent {
  private _router = inject(Router);

  goToLogIn() {
    this._router.navigate(['/auth/log-in']);
  }

  goToSignUp() {
    this._router.navigate(['/auth/sign-up']);
  }
}
