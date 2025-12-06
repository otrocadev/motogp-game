import { Component, computed, input, output } from '@angular/core';
import { baseImgUrl } from '../../../../config/endpoints';
import { getMonthName } from '../../../../shared/utils/utils';
import { GrandPrixCalendarEvent } from '../../../../shared/types/race.types';

@Component({
  selector: 'app-grand-prix-card-admin',
  imports: [],
  templateUrl: './grand-prix-card-admin.component.html',
  styles: ``,
})
export class GrandPrixCardAdminComponent {
  grandPrix = input<GrandPrixCalendarEvent>();
  edit = output<string>();
  delete = output<string>();

  constructor() {
    this.grandPrix();
  }

  grandPrixName = computed(() => {
    return this.grandPrix()?.title;
  });

  grandPrixFlagUrl = computed(() => {
    return `${baseImgUrl}${this.grandPrix()?.flag_img || ''}`;
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

  onEditClick() {
    const id = this.grandPrix()?.id;
    if (id) this.edit.emit(id);
  }

  onDeleteClick() {
    const id = this.grandPrix()?.id;
    if (id) this.delete.emit(id);
  }
}
