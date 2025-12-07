import { Component, inject } from '@angular/core';
import { AsideMenuService } from './aside-menu.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/data-access/auth.service';
import { computed } from '@angular/core';

@Component({
  selector: 'app-aside-menu',
  imports: [],
  templateUrl: './aside-menu.component.html',
  styles: ``,
})
export class AsideMenuComponent {
  asideMenuService = inject(AsideMenuService);
  menuOption = this.asideMenuService.menuOption;

  private _authService = inject(AuthService);
  private _router = inject(Router);

  isAdmin = computed(() => this._authService.user()?.role === 'admin');

  handleMenuOptionChange(option: string) {
    this.asideMenuService.setMenuOption(option);

    if (this.isAdmin()) {
      if (option === 'grand-prix') {
        this._router.navigate([`/admin`]);
      } else {
        this._router.navigate([`/admin/${option}`]);
      }
    } else {
      if (option === 'grand-prix') {
        this._router.navigate([`/home`]);
      } else {
        this._router.navigate([`/home/${option}`]);
      }
    }
  }
}
