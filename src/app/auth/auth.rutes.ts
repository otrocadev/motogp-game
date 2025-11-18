import { Routes } from '@angular/router';

export default [
  {
    path: 'sign-up',
    loadComponent: () => import('./components/sign-up/sign-up.component'),
  },
  {
    path: 'log-in',
    loadComponent: () => import('./components/log-in/log-in.component'),
  },
] as Routes;
