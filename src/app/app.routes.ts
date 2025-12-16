import { Routes } from '@angular/router';
import {
  privateGuard,
  publicGuard,
  adminGuard,
} from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [publicGuard],
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
          import(
            './home-page/user-home/user-home-summary-page/user-home-summary-page.component'
          ).then((m) => m.UserHomeSummaryPageComponent),
      },
      {
        path: 'grand-prix',
        loadComponent: () =>
          import(
            './grand-prix/shared/grand-prix-list/grand-prix-list.component'
          ).then((m) => m.GrandPrixListComponent),
      },
      {
        path: 'motogp-standings',
        loadComponent: () =>
          import('./motogp-standings/motogp-standings.component').then(
            (m) => m.MotogpStandingsComponent
          ),
      },
      {
        path: 'game-standings',
        loadComponent: () =>
          import('./game-standings/game-standings.component').then(
            (m) => m.GameStandingsComponent
          ),
      },
      {
        path: 'riders',
        loadComponent: () =>
          import('./riders/user/riders-list.component').then(
            (m) => m.RidersListComponent
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
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./grand-prix/admin/grand-prix-view-admin.component').then(
            (m) => m.GrandPrixViewAdminComponent
          ),
      },
      {
        path: 'sessions',
        loadComponent: () =>
          import(
            './grand-prix/shared/grand-prix-list/grand-prix-list.component'
          ).then((m) => m.GrandPrixListComponent),
      },
    ],
  },
];
