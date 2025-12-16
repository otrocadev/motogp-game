import { Component, inject, signal, computed } from '@angular/core';
import { GrandPrixService } from '../../../grand-prix/grand-prix.service';
import { MotogpStandingsService } from '../../../motogp-standings/motogp-standings.service';
import { baseImgUrl } from '../../../config/endpoints';
import { formatDates } from '../../../shared/utils/utils';
import type { NextGrandPrix } from '../../../grand-prix/types/grand-prix.types';
import type { Top5StandingInfo } from '../../../motogp-standings/motogp-standing.types';
import { Top5StandingsComponent } from './top5-standings/top5-standings.component';
import { NextGpCardComponent } from './next-gp-card/next-gp-card.component';

@Component({
  selector: 'app-user-home-summary-page',
  imports: [Top5StandingsComponent, NextGpCardComponent],
  templateUrl: './user-home-summary-page.component.html',
})
export class UserHomeSummaryPageComponent {
  private _grandPrixService = inject(GrandPrixService);
  private _motogpStandingsService = inject(MotogpStandingsService);
  baseImgUrl = baseImgUrl;
  nextGrandPrix = signal<NextGrandPrix>({} as NextGrandPrix);
  top5riders = signal<Top5StandingInfo[]>([]);

  async ngOnInit() {
    this.nextGrandPrix.set(await this._grandPrixService.getNextGrandPrix());
    this.top5riders.set(await this._motogpStandingsService.getTop5Standings());
  }

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

  top5Riders = computed(() => {
    return this.top5riders();
  });
}
