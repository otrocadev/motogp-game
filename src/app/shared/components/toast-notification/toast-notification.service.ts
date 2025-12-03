import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  toastMessage = signal<string>('');
  showToast = signal<boolean>(false);

  show(message: string) {
    this.toastMessage.set(message);
    this.showToast.set(true);
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.toastMessage.set('');
    this.showToast.set(false);
  }
}
