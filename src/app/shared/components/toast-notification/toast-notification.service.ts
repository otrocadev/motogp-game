import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  toastMessage = signal<string>('');
  showToast = signal<boolean>(false);
  toastType = signal<'success' | 'error'>('success');

  show(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage.set(message);
    this.showToast.set(true);
    this.toastType.set(type);
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.toastMessage.set('');
    this.showToast.set(false);
  }
}
