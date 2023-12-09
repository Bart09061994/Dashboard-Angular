import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
class AdminGuard {
  constructor(private AuthService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.AuthService['isAdminUser']) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
export const isAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AdminGuard).canActivate(route, state);
};
