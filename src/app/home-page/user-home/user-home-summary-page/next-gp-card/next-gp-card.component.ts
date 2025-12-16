import { Component, computed, input } from '@angular/core';
import type { NextGrandPrix } from '../../../../grand-prix/types/grand-prix.types';
import { formatDates } from '../../../../shared/utils/utils';
import { baseImgUrl } from '../../../../config/endpoints';

@Component({
  selector: 'app-next-gp-card',
  imports: [],
  templateUrl: './next-gp-card.component.html',
  styles: ``,
})
export class NextGpCardComponent {
  baseImgUrl = baseImgUrl;
  nextGrandPrix = input<NextGrandPrix>();

  gp = computed(() => {
    const nextGP = this.nextGrandPrix();

    if (!nextGP) {
      const today = new Date();
      return {
        imageSrc: this.baseImgUrl,
        grandPrixDates: formatDates(today, today),
        name: '',
        location: '',
      };
    }

    const startDate = new Date(nextGP.start_date);
    const endDate = new Date(nextGP.end_date);

    return {
      imageSrc: this.baseImgUrl + nextGP.flag_img,
      grandPrixDates: formatDates(startDate, endDate),
      name: nextGP.name,
      location: nextGP.location,
    };
  });
}
