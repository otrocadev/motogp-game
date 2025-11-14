import { Routes } from '@angular/router';

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
        loadComponent: () =>
          import('./auth/components/sign-up/sign-up.component'),
      },
      {
        path: 'log-in',
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
