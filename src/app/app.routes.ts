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
    path: '',
    canActivate: [privateGuard],
    loadComponent: () =>
      import('./home-page/user-home/user-home.component').then(
        (m) => m.UserHomeComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./grand-prix/user/grand-prix-list.component').then(
            (m) => m.GrandPrixListComponent
          ),
      },
    ],
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
      { path: '**', redirectTo: 'log-in' },
    ],
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./home-page/admin-home/admin-home.component').then(
        (m) => m.AdminHomeComponent
      ),
  },
];
