import { Component, computed, input, output } from '@angular/core';
import { baseImgUrl } from '../../../config/endpoints';
import { getMonthName } from '../../../shared/helpers/utils';

@Component({
  selector: 'app-grand-prix-card-admin',
  imports: [],
  templateUrl: './grand-prix-card-admin.component.html',
  styles: ``,
})
export class GrandPrixCardAdminComponent {
  grandPrix = input<any>();
  edit = output<string>();
  delete = output<string>();

  constructor() {
    this.grandPrix();
  }

  grandPrixName = computed(() => {
    return this.grandPrix()?.title;
  });

  grandPrixFlagUrl = computed(() => {
    return `${baseImgUrl}${this.grandPrix()?.flag_img}`;
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

  onEditClick() {
    this.edit.emit(this.grandPrix()?.id);
  }

  onDeleteClick() {
    this.delete.emit(this.grandPrix()?.id);
  }
}
