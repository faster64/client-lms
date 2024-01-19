import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { switchMap } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";
import { HubConnectionService } from "../services/base/hub-connection.service";
import { SharedService } from "../services/base/shared.service";
import { TransferDataService } from "../services/base/transfer-data.service";
import { TranslationService } from "../services/base/translation.service";
import { UtilsService } from "../services/base/utils.service";
import { UserService } from "../services/user/user.serivce";
import { BaseResolver } from "./base.resolver";

@Injectable({
    providedIn: 'root'
})
export class RequiredTimeOptionsResolver<T> extends BaseResolver<T> {

    constructor(
        router: Router,
        authService: AuthService,
        sharedService: SharedService,
        translationService: TranslationService,
        transferService: TransferDataService,
        hubService: HubConnectionService,
        userService: UserService,
        public utilService: UtilsService
    ) {
        super(router, authService, sharedService, translationService, transferService, hubService, userService);
    }

    override resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T | any {
        if (UtilsService.TimeOptions.length) {
            return super.resolve(route, state);
        }
        return this.utilService
                   .getTimeRangeOptions()
                   .pipe(switchMap(() => super.resolve(route, state)));
    }
}
