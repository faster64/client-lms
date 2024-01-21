import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { PublisherService } from "../services/base/publisher.service";

@Injectable({
  providedIn: 'root'
})
export class BaseResolver implements Resolve<boolean> {

  constructor(
    public publisher: PublisherService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.publisher.cancelRouteEvent.emit();
    return of(true);
  }

}
