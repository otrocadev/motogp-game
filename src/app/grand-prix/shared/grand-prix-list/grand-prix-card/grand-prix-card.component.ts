import { Component, computed, input } from '@angular/core';
import { baseImgUrl } from '../../../../config/endpoints';
import { formatDates } from '../../../../shared/utils/utils';
import { GrandPrixCalendarEvent } from '../../../../shared/types/race.types';
import { SessionButtonsNavComponent } from '../session-buttons-nav/session-buttons-nav.component';

@Component({
  selector: 'app-grand-prix-card',
  imports: [SessionButtonsNavComponent],
  templateUrl: './grand-prix-card.component.html',
  styles: ``,
})
export class GrandPrixCardComponent {
  grandPrix = input<GrandPrixCalendarEvent>();

  startDate = computed(() => {
    const start = this.grandPrix()?.start;
    return start ? new Date(start) : new Date();
  });

  endDate = computed(() => {
    const end = this.grandPrix()?.end;
    return end ? new Date(end) : new Date();
  });

  actualDate = computed(() => new Date());

  eventStatus = computed<'passed' | 'active' | 'upcomming'>(() => {
    const start = this.startDate();
    const end = this.endDate();
    const now = this.actualDate();

    if (start < now) {
      if (end < now) {
        return 'passed';
      } else {
        return 'active';
      }
    } else {
      return 'upcomming';
    }
  });

  grandPrixName = computed(() => {
    return this.grandPrix()?.title;
  });

  grandPrixFlagUrl = computed(() => {
    return `${baseImgUrl}${this.grandPrix()?.flag_img}`;
  });

  grandPrixDates = computed(() => {
    const start = this.startDate();
    const end = this.endDate();

    return formatDates(start, end);
  });

  grandPrixLocation = computed(() => {
    return this.grandPrix()?.location;
  });
}
