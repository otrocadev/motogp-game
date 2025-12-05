import { Component, inject } from '@angular/core';
import { AsideMenuService } from './aside-menu.service';

@Component({
  selector: 'app-aside-menu',
  imports: [],
  templateUrl: './aside-menu.component.html',
  styles: ``,
})
export class AsideMenuComponent {
  asideMenuService = inject(AsideMenuService);

  menuOption = this.asideMenuService.menuOption;
}
