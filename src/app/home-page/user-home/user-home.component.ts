import { Component, inject, OnInit } from '@angular/core';
import { AsideMenuComponent } from '../../shared/components/aside-menu/aside-menu.component';
import { AsideMenuService } from '../../shared/components/aside-menu/aside-menu.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-home',
  imports: [AsideMenuComponent, RouterOutlet],
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent implements OnInit {
  asideMenuService = inject(AsideMenuService);
  menuOption = this.asideMenuService.menuOption;
  private _router = inject(Router);

  handleMenuOptionChange(option: string) {
    this.asideMenuService.setMenuOption(option);

    if (option === 'home') {
      this._router.navigate([`/home`]);
    } else {
      this._router.navigate([`/${option}`]);
    }
  }

  ngOnInit() {
    const currentPath = this._router.url.split('/')[1] || 'home';
    this.asideMenuService.setMenuOption(currentPath);
  }
}
