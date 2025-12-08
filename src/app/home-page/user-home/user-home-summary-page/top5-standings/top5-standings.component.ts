import { Component, input } from '@angular/core';
import type { Top5StandingInfo } from '../../../../shared/types/standing.types';
import { baseImgUrl } from '../../../../config/endpoints';

@Component({
  selector: 'app-top5-standings',
  imports: [],
  templateUrl: './top5-standings.component.html',
})
export class Top5StandingsComponent {
  top5riders = input<Top5StandingInfo[]>();
  baseImgUrl = baseImgUrl;
}
