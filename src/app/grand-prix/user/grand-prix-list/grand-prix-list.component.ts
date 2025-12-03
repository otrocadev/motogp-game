import { Component, inject } from '@angular/core';
import { GrandPrixService } from '../../grand-prix.service';
import { baseImgUrl } from '../../../config/endpoints';
import { GrandPrixCardComponent } from './grand-prix-card/grand-prix-card.component';

@Component({
  selector: 'app-grand-prix-list',
  imports: [GrandPrixCardComponent],
  templateUrl: './grand-prix-list.component.html',
  styles: ``,
})
export default class GrandPrixListComponent {
  grandPrixService = inject(GrandPrixService);
  grandPrixCalendarEvents = this.grandPrixService.grandPrixCalendarEvents;
  baseImgUrl = baseImgUrl;

  ngOnInit() {
    this.grandPrixService.getGrandPrixCalendarEvents();
  }
}
