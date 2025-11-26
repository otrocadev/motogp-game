import { inject } from '@angular/core';
import { AuthService } from '../../auth/data-access/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const privateGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const {
    data: { session },
  } = await authService.session();

  if (session) {
    return true;
  }

  return router.createUrlTree(['auth/log-in']);
};

export const publicGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const {
    data: { session },
  } = await authService.session();

  if (!session) {
    return true;
  }

  return router.createUrlTree(['/']);
};

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.user()?.role !== 'admin') {
    return router.createUrlTree(['/']);
  }

  return true;
};
