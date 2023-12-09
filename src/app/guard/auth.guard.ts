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
class LoginGuard {
  constructor(private AuthService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.includes('signUp')) {
      return true;
    }
    if (this.AuthService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

export const isLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(LoginGuard).canActivate(route, state);
};
