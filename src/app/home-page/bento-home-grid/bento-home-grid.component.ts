import { Component, computed, inject } from '@angular/core';
import { BentoElementComponent } from './bento-element/bento-element.component';
import { AuthService } from '../../auth/data-access/auth.service';
import { mainMenuOptions } from '../../config/mainMenu.config';

@Component({
  selector: 'app-bento-home-grid',
  imports: [BentoElementComponent],
  templateUrl: './bento-home-grid.component.html',
  styles: ``,
})
export class BentoHomeGridComponent {
  private _authService = inject(AuthService);

  isAdmin = computed(() => this._authService.user()?.role === 'admin');
  userName = computed(() => this._authService.user()?.username);

  mainMenuOptions = mainMenuOptions;
}
