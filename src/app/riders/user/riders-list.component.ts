import { Component, inject, OnInit, signal } from '@angular/core';
import { RiderCardComponent } from './rider-card/rider-card.component';
import { RidersService } from '../riders.service';
import { RiderInfo } from '../rider.types';

@Component({
  selector: 'app-riders-list',
  imports: [RiderCardComponent],
  templateUrl: './riders-list.component.html',
})
export class RidersListComponent implements OnInit {
  ridersService = inject(RidersService);
  riders = this.ridersService.riders;

  async ngOnInit(): Promise<void> {
    await this.ridersService.getRiders();
  }
}
