import { Routes } from '@angular/router';
import {
  privateGuard,
  publicGuard,
  adminGuard,
} from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component'),
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
  {
    path: 'season-calendar',
    canActivate: [privateGuard],
    loadComponent: () => import('./grand-prix-list/grand-prix-list.component'),
  },
  {
    path: 'grand-prix-management',
    canActivate: [privateGuard, adminGuard],
    loadComponent: () =>
      import(
        './admin/grand-prix-calendar-admin/grand-prix-calendar-admin.component'
      ),
  },
];
