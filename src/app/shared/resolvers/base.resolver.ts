import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "../services/auth/auth.service";
import { HubConnectionService } from "../services/base/hub-connection.service";
import { SharedService } from "../services/base/shared.service";
import { TransferDataService } from "../services/base/transfer-data.service";
import { TranslationService } from "../services/base/translation.service";
import { UserService } from "../services/user/user.serivce";

@Injectable({
  providedIn: 'root'
})
export class BaseResolver<T> implements Resolve<T> {

  constructor(
    public router: Router,
    public authService: AuthService,
    public sharedService: SharedService,
    public translationService: TranslationService,
    public transferService: TransferDataService,
    public hubService: HubConnectionService,
    public userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T | any {
    // if (this.sharedService.deviceType == DeviceType.Mobile) {
    //   return this.router.navigateByUrl(`/${Routing.UNSUPPORT_DEVICE.path}`);
    // }

    this.transferService.resolvedEvent.emit();
    return of(true);

    // if (!this.hubService.isAuthenticated && this.hubService.connection.state == HubConnectionState.Connected) {
    //   console.customize("revoke the current connection because it's unauthenticated, and will then get a new authenticated connection");
    //   return this.hubService
    //     .stop()
    //     .pipe(
    //       switchMap(() => {
    //         setTimeout(() => SnackBar.close(), 50);
    //         return this.connect(route);
    //       })
    //     )
    // }
    // return this.connect(route);
  }

  connect(route: ActivatedRouteSnapshot) {
    // return this.hubService
    //   .start()
    //   .pipe(
    //     catchError(error => {
    //       SnackBar.danger(new SnackBarParameter(this, TranslationService.VALUES['ERROR']['COULD_NOT_CONNECT_TO_SERVER'], SnackBar.forever));
    //       return throwError(error);
    //     }),
    //     switchMap(() => {
    //       this.hubService.isAuthenticated = true;
    //       if (!this.userService.user.config && this.authService.isSignedIn()) {
    //         return this.userService.getConfig();
    //       }

    //       const service = new ServiceResult();
    //       service.data = this.userService.user?.config ?? new UserConfig();
    //       service.code = 'success';
    //       return of(service);
    //     }),
    //     switchMap(resp => {
    //       if (resp.code == 'success') {
    //         this.userService.user.config = resp.data;
    //         this.translationService.use(this.userService.user.config.language);
    //       } else {
    //         console.err(resp.message);
    //         this.userService.user.config = new UserConfig();
    //       }

    //       this.transferService.resolvedEvent.emit();
    //       return of(resp);
    //     })
    //   );
  }
}
