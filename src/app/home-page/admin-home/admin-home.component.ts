import { Component, inject } from '@angular/core';
import { AsideMenuComponent } from '../../shared/components/aside-menu/aside-menu.component';
import { AsideMenuService } from '../../shared/components/aside-menu/aside-menu.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [AsideMenuComponent, RouterOutlet],
  templateUrl: './admin-home.component.html',
})
export class AdminHomeComponent {
  asideMenuService = inject(AsideMenuService);
  menuOption = this.asideMenuService.menuOption;
  private _router = inject(Router);

  handleMenuOptionChange(option: string) {
    this.asideMenuService.setMenuOption(option);

    if (option === 'grand-prix') {
      this._router.navigate([`/admin`]);
    } else {
      this._router.navigate([`/admin/${option}`]);
    }
  }
}
