import { Component, signal } from '@angular/core';
import { GrandPrixListAdminComponent } from './grand-prix-list-admin/grand-prix-list-admin.component';
import { GrandPrixCalendarAdminComponent } from './grand-prix-calendar-admin/grand-prix-calendar-admin.component';

@Component({
  selector: 'app-grand-prix-view-admin',
  imports: [GrandPrixListAdminComponent, GrandPrixCalendarAdminComponent],
  templateUrl: './grand-prix-view-admin.component.html',
  styles: ``,
})
export class GrandPrixViewAdminComponent {
  grandPrixMenuOption = signal<string>('calendar');
}
