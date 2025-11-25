import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/components/home-page/home-page.component'),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-up',
        canActivate: [publicGuard],
        loadComponent: () =>
          import('./auth/components/sign-up/sign-up.component'),
      },
      {
        path: 'log-in',
        canActivate: [publicGuard],
        loadComponent: () =>
          import('./auth/components/log-in/log-in.component'),
      },
      {
        path: '**',
        redirectTo: 'log-in',
      },
    ],
  },
];
