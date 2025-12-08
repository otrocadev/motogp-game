import { inject } from '@angular/core';
import { AuthService } from '../../auth/data-access/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const privateGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const {
    data: { session },
  } = await authService.session();

  if (!session) {
    return router.createUrlTree(['auth/log-in']);
  }

  if (!authService.user()) {
    await authService.updateUserInfo(session.user.id);
  }

  if (authService.user()?.role === 'admin') {
    return router.createUrlTree(['/admin']);
  }

  return true;
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

  if (!authService.user()) {
    await authService.updateUserInfo(session.user.id);
  }

  if (authService.user()?.role === 'admin') {
    return router.createUrlTree(['/admin']);
  }

  return router.createUrlTree(['/home']);
};

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const {
    data: { session },
  } = await authService.session();

  if (!session) {
    return router.createUrlTree(['auth/log-in']);
  }

  if (!authService.user()) {
    await authService.updateUserInfo(session.user.id);
  }

  if (authService.user()?.role !== 'admin') {
    return router.createUrlTree(['/']);
  }

  return true;
};
