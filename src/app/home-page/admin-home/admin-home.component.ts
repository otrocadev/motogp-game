import { Component, inject } from '@angular/core';
import { AsideMenuComponent } from '../../shared/components/aside-menu/aside-menu.component';
import { GrandPrixViewAdminComponent } from '../../grand-prix/admin/grand-prix-view-admin.component';
import { AsideMenuService } from '../../shared/components/aside-menu/aside-menu.service';

@Component({
  selector: 'app-admin-home',
  imports: [AsideMenuComponent, GrandPrixViewAdminComponent],
  templateUrl: './admin-home.component.html',
})
export class AdminHomeComponent {
  asideMenuService = inject(AsideMenuService);

  menuOption = this.asideMenuService.menuOption;
}
