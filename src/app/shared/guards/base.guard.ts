import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { RoutingConfig } from 'src/app/models/base/routing-config.model';
import { Message } from 'src/app/models/message';
import { MessageBox } from '../components/element/message-box/message-box.component';
import { Routing } from '../constants/routing.constant';
import { StringHelper } from '../helpers/string.helper';
import { AuthService } from '../services/auth/auth.service';
import { AuthUtility } from '../utility/auth-utility';
import { ServerInfoService } from '../services/base/server-info.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { SharedModule } from '../shared.module';
import { SharedService } from '../services/base/shared.service';

@Injectable({
  providedIn: 'root' // you can change to any level if needed
})
export class BaseGuard implements CanActivate {
  constructor(public router: Router, public authService: AuthService, public injector: Injector) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canConnect()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.err(error);
          if (error.status == HttpEventType.Sent) {
            this.router.navigateByUrl(`/${Routing.NOT_CONNECTED.path}?continue=${window.location.href}`);
          }
          return throwError(error);
        }),
        switchMap(() => {
          this.injector.get(ServerInfoService).getServerTime();
          if (this.authService.isSignedIn()) {
            return this.checkPermission(next);
          }
          if (StringHelper.isNullOrEmpty(this.authService.getUserId())) {
            this.authService.moveOut();
            return of(false);
          }
          return of(true);
        }));
  }

  canConnect() {
    const service = this.injector.get(ServerInfoService);
    return service.checkConnect();
  }

  checkPermission(next: ActivatedRouteSnapshot): Observable<boolean> {
    try {
      const model = AuthUtility.getRoutingConfig(next);
      if (model == null) {
        return of(false);
      }

      if (!model.exponents || !model.exponents.length) {
        return of(true);
      }
      const valid = AuthUtility.checkModulePermission(model.exponents[0]);
      if (!valid) {
        console.warning(`access to /${next.routeConfig.path} but user module permission is not valid`, model.exponents);
        const firstAllowAccessModule = this.getFirstAllowAccessModule();
        if (!firstAllowAccessModule) {
          MessageBox
            .confirm(new Message(this, { content: 'Bạn chưa được cấp quyền truy cập. Vui lòng liên hệ với quản trị viên!' }))
            .subscribe(_ => {
              this.authService.signOut();
            });
          return of(false);
        } else {
          window.location.href = `/${firstAllowAccessModule.path}`;
        }
        return of(false);
      }
      return of(true);
    } catch (error) {
      console.err(`access to /${next.routeConfig.path}: check module permission has been error: `, error);
      MessageBox.information(new Message(this, { content: 'Truy cập lỗi: ' + error }));
      return of(false);
    }
  }

  getFirstAllowAccessModule() {
    const keys = Object.keys(Routing);
    for (let i = 0; i < keys.length; i++) {
      const config = Routing[keys[i]] as RoutingConfig;
      if (!config.isSystemModule && AuthUtility.checkModulePermission(config.exponents[0])) {
        return config;
      }
    }
    return null;
  }
}
