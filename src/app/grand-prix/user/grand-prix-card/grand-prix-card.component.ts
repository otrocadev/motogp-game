import { Component, computed, input } from '@angular/core';
import { baseImgUrl } from '../../../config/endpoints';
import { getMonthName } from '../../../shared/utils/utils';

@Component({
  selector: 'app-grand-prix-card',
  imports: [],
  templateUrl: './grand-prix-card.component.html',
  styles: ``,
})
export class GrandPrixCardComponent {
  grandPrix = input<any>();

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
    const startDate = new Date(this.grandPrix()?.start);
    const endDate = new Date(this.grandPrix()?.end);

    const displayStartDate =
      startDate.getDate() + ' ' + getMonthName(startDate.getMonth());
    const displayEndDate =
      endDate.getDate() + ' ' + getMonthName(endDate.getMonth());
    return displayStartDate + ' - ' + displayEndDate;
  });
}
