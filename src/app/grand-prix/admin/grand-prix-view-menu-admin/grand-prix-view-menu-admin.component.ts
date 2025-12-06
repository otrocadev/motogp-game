import { Component, inject } from '@angular/core';
import { GrandPrixViewAdminComponent } from '../grand-prix-view-admin.component';

@Component({
  selector: 'app-grand-prix-view-menu-admin',
  imports: [],
  templateUrl: './grand-prix-view-menu-admin.component.html',
  styles: ``,
})
export class GrandPrixViewMenuAdminComponent {
  grandPrixMenuOption = inject(GrandPrixViewAdminComponent).grandPrixMenuOption;
}
