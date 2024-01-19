import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStatus } from '../enumerations/auth-status.enum';
import { AuthService } from '../services/auth/auth.service';
import { CommonRedirect } from '../constants/routing.constant';

@Injectable({
  providedIn: 'root' // you can change to any level if needed
})
export class SignInUpGuard implements CanActivate {

  constructor(public router: Router, public authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.getAuthStatus() === AuthStatus.SignedIn) {
      this.router.navigate([`/${CommonRedirect}`]);
      return false;
    }
    return true;
  }
}
