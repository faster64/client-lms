import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { HttpService } from 'src/app/shared/services/base/http.service';
import { TransferDataService } from 'src/app/shared/services/base/transfer-data.service';
import { environment } from 'src/environments/environment';
import { LocalHelper } from '../../helpers/local.helper';
import { Routing } from '../../constants/routing.constant';
import { LocalStorageKey } from '../../constants/localstorage-key.constant';
import { AuthStatus } from '../../enums/auth-status.enum';
import { ServiceResult } from '../../models/base/service-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static CurrentStatus = AuthStatus.Unknown;

  private clearListSession = [];

  private clearListLocal = [];

  public auth_base_host = environment.base_host + "/" + environment.api_version;
  public serviceName = '';
  public controller = 'auth';
  public refreshing = false;

  constructor(
    public httpService: HttpService,
    public transfer: TransferDataService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
  }

  getUrl() {
    if (this.serviceName == '') {
      return `${this.auth_base_host}/${this.controller}`;
    }
    return `${this.auth_base_host}/${this.serviceName}/${this.controller}`;
  }

  moveOut(hasNext?: boolean) {
    localStorage.removeItem('auth');
    if (hasNext == undefined || hasNext == true) {
      window.location.href = `/${Routing.LOGIN.path}?next=${window.location.href}`;
      return;
    }
    window.location.href = `/${Routing.LOGIN.path}`;
  }

  private getContext = () => LocalHelper.parse('auth');

  getProperty = (name: string) => this.getContext()[name] || '';

  setProperty(name: string, value: any) {
    const auth = this.getContext();

    auth[name] = value;
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  getAccessToken = () => this.getProperty(LocalStorageKey.ACCESS_TOKEN);

  getRefreshToken = () => this.getProperty(LocalStorageKey.REFRESH_TOKEN);

  getCurrentStatus(): AuthStatus {
    const status = this.getProperty(LocalStorageKey.AUTH_STATUS);
    switch (status) {
      case 1:
        return AuthStatus.LoggedIn;
      case 2:
        return AuthStatus.LoggedOut;
      case 3:
        return AuthStatus.LoggingOut;
      default:
        return AuthStatus.Unknown;
    }
  }

  setAuthStatus(status: AuthStatus) {
    this.setProperty(LocalStorageKey.AUTH_STATUS, status);
  }

  removeAccessToken() {
    this.setProperty(LocalStorageKey.ACCESS_TOKEN, '');
  }

  saveAuthenticate(accessToken: string, refreshToken: string) {
    const config = StringHelper.parseJwt(accessToken);
    config[LocalStorageKey.AUTH_STATUS] = AuthStatus.LoggedIn;
    config[LocalStorageKey.ACCESS_TOKEN] = accessToken;
    config[LocalStorageKey.REFRESH_TOKEN] = refreshToken;

    localStorage.setItem('auth', JSON.stringify(config));
  }
}
