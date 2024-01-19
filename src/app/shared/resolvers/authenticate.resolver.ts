import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "../services/auth/auth.service";
import { AuthResolveConstant } from "../constants/auth-resolve.constant";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateResolver<T> implements Resolve<T> {

  constructor(
    public router: Router,
    public authService: AuthService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T | any {
    AuthService.AuthResolveState = AuthResolveConstant.RESOLVING;
    return true;
  }
}
