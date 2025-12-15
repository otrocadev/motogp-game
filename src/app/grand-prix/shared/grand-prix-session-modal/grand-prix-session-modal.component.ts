import { Component, inject, OnInit, signal, Inject } from '@angular/core';
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { RidersService } from '../../../riders/riders.service';
import { AuthService } from '../../../auth/data-access/auth.service';
import { GrandPrixSessionService } from '../../grand-prix-session.service';
import { RiderInfo } from '../../../riders/rider.types';
import { UserGuess, SessionType, AdminGuess } from '../../types/guess.types';
import { ToastNotificationService } from '../../../shared/components/toast-notification/toast-notification.service';

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
  private authService = inject(AuthService);
  private grandPrixSessionService = inject(GrandPrixSessionService);
  private toastNotificationService = inject(ToastNotificationService);
  dialogRef = inject(DialogRef);

  orderedRiders = signal<RiderInfo[]>([]);
  allRiders = signal<RiderInfo[]>([]);
  grandPrixId = signal<number>(0);
  sessionType = signal<SessionType>('RACE');
  userId = signal<string>('');
  userType = signal<string>('user');

  // add condition to check if the session already in the BBDD
  constructor(
    @Inject(DIALOG_DATA)
    public data: { grandPrixId: number; sessionType: SessionType }
  ) {
    this.grandPrixId.set(this.data.grandPrixId);
    this.sessionType.set(this.data.sessionType);
  }

  async ngOnInit() {
    await this.ridersService.getRiders();
    this.allRiders.set(this.ridersService.riders());
    await this.authService.session();
    this.userId.set(this.authService.user()?.id!);
    this.userType.set(this.authService.user()?.role!);
  }

  drop(event: CdkDragDrop<RiderInfo[]>) {
    if (event.previousContainer === event.container) {
      const updatedList = [...event.container.data];
      moveItemInArray(updatedList, event.previousIndex, event.currentIndex);

      if (event.container.id === 'orderedRidersList') {
        this.orderedRiders.set(updatedList);
      } else {
        this.allRiders.set(updatedList);
      }
    } else {
      const sourceList = [...event.previousContainer.data];
      const targetList = [...event.container.data];

      transferArrayItem(
        sourceList,
        targetList,
        event.previousIndex,
        event.currentIndex
      );

      if (event.previousContainer.id === 'orderedRidersList') {
        this.orderedRiders.set(sourceList);
        this.allRiders.set(targetList);
      } else {
        this.allRiders.set(sourceList);
        this.orderedRiders.set(targetList);
      }
    }
  }

  formatetUserGuessesArray(): UserGuess[] {
    const formattedData = this.orderedRiders().map((rider, index) => ({
      grand_prix_id: this.grandPrixId(),
      session_type: this.sessionType(),
      rider: rider.number,
      position: index + 1,
      user_id: this.userId(),
    }));

    return formattedData;
  }

  formatetAdminResultsArray(): AdminGuess[] {
    const formattedData = this.orderedRiders().map((rider, index) => ({
      grand_prix_id: this.grandPrixId(),
      session_type: this.sessionType(),
      rider: rider.number,
      position: index + 1,
    }));

    return formattedData;
  }

  async onSubmit() {
    if (this.userType() === 'admin') {
      try {
        await this.grandPrixSessionService.submitSessionResults(
          this.formatetAdminResultsArray()
        );
        this.toastNotificationService.show('Results submitted successfully');
      } catch (error) {
        this.toastNotificationService.show('Error submitting results', 'error');
      } finally {
        this.dialogRef.close();
      }
    } else if (this.userType() === 'user') {
      try {
        await this.grandPrixSessionService.submitSessionGuesses(
          this.formatetUserGuessesArray()
        );
        this.toastNotificationService.show('Guesses submitted successfully');
      } catch (error) {
        this.toastNotificationService.show('Error submitting guesses', 'error');
      } finally {
        this.dialogRef.close();
      }
    }
  }
}
