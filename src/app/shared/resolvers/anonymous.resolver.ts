import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { of, throwError } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { TransferDataService } from "../services/base/transfer-data.service";
import { HubConnectionService } from "../services/base/hub-connection.service";
import { catchError, switchMap } from "rxjs/operators";
import { SnackBar } from "../components/element/snackbar/snackbar.component";
import { SnackBarParameter } from "src/app/models/snackbar.param";
import { TranslationService } from "../services/base/translation.service";

@Injectable({
  providedIn: 'root'
})
export class AnonymousResolver<T> implements Resolve<T> {

  constructor(
    public router: Router,
    public transferService: TransferDataService,
    public hubService: HubConnectionService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T | any {
    this.transferService.resolvedEvent.emit();
    return of(true);
  }
}
