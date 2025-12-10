import { Component, input, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { GrandPrixSessionModalComponent } from '../../grand-prix-session-modal/grand-prix-session-modal.component';

@Component({
  selector: 'app-session-buttons-nav',
  imports: [],
  templateUrl: './session-buttons-nav.component.html',
})
export class SessionButtonsNavComponent {
  grandPrixId = input<number>();
  private manageSessionDialog = inject(Dialog);

  openSessionModal() {
    this.manageSessionDialog.open(GrandPrixSessionModalComponent);
  }
}
