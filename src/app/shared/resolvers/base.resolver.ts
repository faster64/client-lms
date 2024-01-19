import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseResolver implements Resolve<boolean> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return of(true);
  }

}
