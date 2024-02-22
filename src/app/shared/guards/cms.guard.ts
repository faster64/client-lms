import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { AuthUtility } from "../utility/auth-utility";
import { ActionExponent } from "../enums/exponent.enum";
import { SnackBar } from "../snackbar/snackbar.component";
import { SnackBarParameter } from "../snackbar/snackbar.param";
import { TranslationService } from "../services/translation/translation.service";
import { Routing } from "../constants/routing.constant";

@Injectable({
  providedIn: 'root'
})
export class CmsGuard implements CanActivate {

  constructor(
    public router: Router,
    public authService: AuthService,
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const hasPermission = AuthUtility.checkPermission([ActionExponent.CMS]);
    if (!hasPermission) {
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi', TranslationService.VALUES['errors']['not_permission']));
      this.router.navigateByUrl(Routing.HOME.path);
      return false;
    }

    return true;
  }
}
