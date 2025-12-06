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

  constructor() {
    this.grandPrix();
  }

  grandPrixName = computed(() => {
    return this.grandPrix()?.title;
  });

  grandPrixFlagUrl = computed(() => {
    return `${baseImgUrl}${this.grandPrix()?.flag_img}`;
  });

  grandPrixLocation = computed(() => {
    return this.grandPrix()?.location;
  });

  grandPrixDates = computed(() => {
    const gp = this.grandPrix();
    if (!gp?.start || !gp?.end) return '';

    const startDate = new Date(gp.start as string);
    const endDate = new Date(gp.end as string);

    const displayStartDate =
      startDate.getDate() + ' ' + getMonthName(startDate.getMonth());
    const displayEndDate =
      endDate.getDate() + ' ' + getMonthName(endDate.getMonth());
    return displayStartDate + ' - ' + displayEndDate;
  });
}
