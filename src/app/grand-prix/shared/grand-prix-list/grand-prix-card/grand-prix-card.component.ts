import { Component, computed, input } from '@angular/core';
import { baseImgUrl } from '../../../../config/endpoints';
import { formatDates } from '../../../../shared/utils/utils';
import { GrandPrixEvent } from '../../../types/grand-prix.types';
import { SessionButtonsNavComponent } from '../session-buttons-nav/session-buttons-nav.component';

@Component({
  selector: 'app-grand-prix-card',
  imports: [SessionButtonsNavComponent],
  templateUrl: './grand-prix-card.component.html',
  styles: ``,
})
export class GrandPrixCardComponent {
  grandPrix = input<GrandPrixEvent>();

  startDate = computed(() => {
    const start = this.grandPrix()?.start_date;
    if (!start) return new Date();

    const [year, month, day] = start.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  });
  endDate = computed(() => {
    const end = this.grandPrix()?.end_date;
    if (!end) return new Date();
    const [year, month, day] = end.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  });

  actualDate = computed(() => new Date());

  eventStatus = computed<'passed' | 'active' | 'upcoming'>(() => {
    const start = this.startDate();
    const end = this.endDate();
    const now = new Date();

    const startDate = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (today < startDate) {
      return 'upcoming';
    } else if (today >= startDate && today <= endDate) {
      return 'active';
    } else {
      return 'passed';
    }
  });

  grandPrixId = computed(() => {
    return this.grandPrix()?.id;
  });

  grandPrixName = computed(() => {
    return this.grandPrix()?.name;
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
