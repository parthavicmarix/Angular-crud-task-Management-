import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import AppPages from '../constants/AppPages';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const _authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated or not
  if (!_authService.isAuthenticated()) {
    return of(router.createUrlTree([`${AppPages.Login}`]));
  } else {
    return of(true);
  }
};
