import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ToastNotificationComponent } from './shared/components/toast-notification/toast-notification.component';
import { ToastNotificationService } from './shared/components/toast-notification/toast-notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'motogp-game';
  toastNotificationService = inject(ToastNotificationService);
}
