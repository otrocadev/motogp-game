import { Component } from '@angular/core';
import { GrandPrixListComponent } from '../../grand-prix/user/grand-prix-list/grand-prix-list.component';

@Component({
  selector: 'app-user-home',
  imports: [GrandPrixListComponent],
  templateUrl: './user-home.component.html',
})
export class UserHomeComponent {}
