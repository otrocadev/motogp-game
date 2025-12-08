import { Component, inject } from '@angular/core';
import { AsideMenuComponent } from '../../shared/components/aside-menu/aside-menu.component';
import { AsideMenuService } from '../../shared/components/aside-menu/aside-menu.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-home',
  imports: [AsideMenuComponent, RouterOutlet],
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent {
  asideMenuService = inject(AsideMenuService);

  menuOption = this.asideMenuService.menuOption;
}
