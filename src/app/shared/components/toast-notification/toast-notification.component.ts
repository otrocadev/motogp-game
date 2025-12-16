import { Component, inject } from '@angular/core';
import { ToastNotificationService } from '../toast-notification/toast-notification.service';

@Component({
  selector: 'app-toast-notification',
  imports: [],
  templateUrl: './toast-notification.component.html',
  styles: ``,
})
export class ToastNotificationComponent {
  toastNotificationService = inject(ToastNotificationService);

  close() {
    this.toastNotificationService.close();
  }
}
