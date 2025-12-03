import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-deletion-confirmation-modal',
  imports: [],
  templateUrl: './deletion-confirmation-modal.component.html',
})
export class DeletionConfirmationModalComponent {
  dialogRef = inject(DialogRef);
  data = inject(DIALOG_DATA);

  deletionItemText = this.data.deletionItemText;

  closeModal() {
    this.dialogRef.close();
  }

  async confirmAction() {
    try {
      await this.data.functionOnConfirm();
      this.dialogRef.close('confirmed');
    } catch (error) {
      console.error(error);
    }
  }
}
