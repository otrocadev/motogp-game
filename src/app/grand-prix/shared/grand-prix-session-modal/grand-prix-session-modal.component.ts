import { Component, inject, OnInit, signal } from '@angular/core';
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { RidersService } from '../../../riders/riders.service';
import { RiderInfo } from '../../../shared/types/rider.types';

@Component({
  selector: 'app-grand-prix-session-modal',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './grand-prix-session-modal.component.html',
  styles: `
  span:nth-child(4n+2) {margin-top: 0.8rem}
  span:nth-child(4n+3) {margin-top: 1.2rem}
  span:nth-child(4n+4) {margin-top: 2rem}
  `,
})
export class GrandPrixSessionModalComponent implements OnInit {
  private ridersService = inject(RidersService);

  riders = signal<RiderInfo[]>([]);

  async ngOnInit() {
    await this.ridersService.getRiders();
    this.riders.set(this.ridersService.riders());
  }

  drop(event: CdkDragDrop<RiderInfo[]>) {
    const updatedRiders = [...this.riders()];
    moveItemInArray(updatedRiders, event.previousIndex, event.currentIndex);
    this.riders.set(updatedRiders);
  }
}
