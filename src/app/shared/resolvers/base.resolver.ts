import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { HubConnectionService } from "../services/base/hub-connection.service";
import { SharedService } from "../services/base/shared.service";
import { TransferDataService } from "../services/base/transfer-data.service";
import { TranslationService } from "../services/base/translation.service";
import { AuthService } from "../services/auth/auth.service";

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
    public hubService: HubConnectionService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T | any {
    this.transferService.resolvedEvent.emit();
    return of(true);
  }
}
