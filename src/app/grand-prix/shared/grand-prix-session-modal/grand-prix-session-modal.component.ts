import { Component, inject, OnInit, signal } from '@angular/core';
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { RidersService } from '../../../riders/riders.service';
import { RiderInfo } from '../../../shared/types/rider.types';

@Component({
  selector: 'app-grand-prix-session-modal',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './grand-prix-session-modal.component.html',
  styles: `
  article:nth-child(4n+3) {margin-top: 0.8rem}
  article:nth-child(4n+4) {margin-top: 1.2rem}
  article:nth-child(4n+5) {margin-top: 2rem}
  `,
})
export class GrandPrixSessionModalComponent implements OnInit {
  private ridersService = inject(RidersService);

  orderedRiders = signal<RiderInfo[]>([]);
  allRiders = signal<RiderInfo[]>([]);

  async ngOnInit() {
    await this.ridersService.getRiders();
    this.allRiders.set(this.ridersService.riders());
  }

  drop(event: CdkDragDrop<RiderInfo[]>) {
    if (event.previousContainer === event.container) {
      // Moving within the same list
      const updatedList = [...event.container.data];
      moveItemInArray(updatedList, event.previousIndex, event.currentIndex);

      if (event.container.id === 'orderedRidersList') {
        this.orderedRiders.set(updatedList);
      } else {
        this.allRiders.set(updatedList);
      }
    } else {
      // Moving between different lists
      const sourceList = [...event.previousContainer.data];
      const targetList = [...event.container.data];

      transferArrayItem(
        sourceList,
        targetList,
        event.previousIndex,
        event.currentIndex
      );

      // Update both signals based on which container is the source
      if (event.previousContainer.id === 'orderedRidersList') {
        this.orderedRiders.set(sourceList);
        this.allRiders.set(targetList);
      } else {
        this.allRiders.set(sourceList);
        this.orderedRiders.set(targetList);
      }
    }
  }
}
