import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Routing } from "../constants/routing.constant";
import { AuthStatus } from "../enums/auth-status.enum";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedOnlyGuard implements CanActivate {

  constructor(public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (AuthService.CurrentStatus == AuthStatus.LoggedIn) {
      this.router.navigateByUrl(Routing.HOME.path);
      return false;
    }
    return true;
  }
}
