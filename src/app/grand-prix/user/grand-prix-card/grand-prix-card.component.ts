import { Component, computed, input } from '@angular/core';
import { baseImgUrl } from '../../../config/endpoints';
import { getMonthName } from '../../../shared/utils/utils';
import { GrandPrixCalendarEvent } from '../../../shared/types/race.types';

@Component({
  selector: 'app-grand-prix-card',
  imports: [],
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

    const displayStartDate =
      start.getDate() + ' ' + getMonthName(start.getMonth());
    const displayEndDate = end.getDate() + ' ' + getMonthName(end.getMonth());

    return displayStartDate + ' - ' + displayEndDate;
  });
}
