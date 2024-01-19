import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { TransferDataService } from "../services/base/transfer-data.service";

@Injectable({
  providedIn: 'root'
})
export class BaseResolver implements Resolve<boolean> {

  constructor(
    public transferService: TransferDataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.transferService.cancelRouteEvent.emit();
    return of(true);
  }

}
