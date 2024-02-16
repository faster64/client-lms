import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, of } from 'rxjs';
import { LoginComponent } from 'src/app/auth-components/login/login.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { HttpService } from 'src/app/shared/services/base/http.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { environment } from 'src/environments/environment';
import { BreakPoint } from '../../constants/break-point.constant';
import { CommonConstant } from '../../constants/common.constant';
import { LocalStorageKey } from '../../constants/localstorage-key.constant';
import { Routing } from '../../constants/routing.constant';
import { AuthStatus } from '../../enums/auth-status.enum';
import { ActionExponent } from '../../enums/exponent.enum';
import { LocalHelper } from '../../helpers/local.helper';
import { AuthResponse } from '../../models/auth/auth-response';
import { LoginRequest } from '../../models/auth/login-request';
import { RefreshTokenModel } from '../../models/auth/refresh-token-model';
import { RegisterRequest } from '../../models/auth/register-request';
import { ServiceResult } from '../../models/base/service-result';
import { AuthUtility } from '../../utility/auth-utility';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static CurrentStatus = AuthStatus.Unknown;

  public static IsLogged = () => AuthService.CurrentStatus == AuthStatus.LoggedIn;

  private clearListSession = [];

  private clearListLocal = [
    LocalStorageKey.CART_ITEMS,
    LocalStorageKey.CMS,
  ];

  private context: any;

  public auth_base_host = environment.base_host + "/" + environment.api_version;
  public serviceName = '';
  public controller = 'auth';
  public refreshing = false;

  constructor(
    public httpService: HttpService,
    public publisher: PublisherService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>
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

  private getContext = () => {
    if (!this.context) {
      this.context = LocalHelper.parse('auth');
    }
    return this.context;
  };


  getProperty = (name: string) => this.getContext()[name] || '';

  setProperty(name: string, value: any) {
    const auth = this.getContext();

    auth[name] = value;
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  getUserId = () => this.getProperty(LocalStorageKey.USER_ID);

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

  setAuthStatus = (status: AuthStatus) => this.setProperty(LocalStorageKey.AUTH_STATUS, status);

  removeAccessToken = () => this.setProperty(LocalStorageKey.ACCESS_TOKEN, '');

  saveAuthenticate(accessToken: string, refreshToken: string) {
    this.context = null;

    const config = StringHelper.parseJwt(accessToken);
    config[LocalStorageKey.AUTH_STATUS] = AuthService.CurrentStatus = AuthStatus.LoggedIn;
    config[LocalStorageKey.ACCESS_TOKEN] = accessToken;
    config[LocalStorageKey.REFRESH_TOKEN] = refreshToken;

    localStorage.setItem('auth', JSON.stringify(config));
    localStorage.setItem(LocalStorageKey.CMS, AuthUtility.checkPermission([ActionExponent.CMS]) + '');
  }

  login = (request: LoginRequest) => this.httpService.post<ServiceResult>(this.getUrl() + `/login?${CommonConstant.DISALLOW_NOTICE}`, request);

  register = (request: RegisterRequest) => this.httpService.post<ServiceResult>(this.getUrl() + '/register', request);

  logout = (callback?: Function) => {
    const accessToken = this.getAccessToken();
    if (!StringHelper.isNullOrEmpty(accessToken)) {
      this.httpService
        .get<AuthResponse>(`${this.getUrl()}/logout`)
        .pipe(
          finalize(() => {
            this.clearAuth();
          })
        )
        .subscribe(resp => {
          if (callback) {
            callback(resp);
          }
        });
    } else {
      this.clearAuth();
    }
  }

  private clearAuth() {
    localStorage.removeItem('auth');
    this.clearListSession.forEach(item => sessionStorage.removeItem(`${environment.organization}_${item}`));
    this.clearListLocal.forEach(item => localStorage.removeItem(item));
    window.location.href = `/${Routing.LOGIN.path}`;
  }

  refreshToken() {
    const model = new RefreshTokenModel();
    model.userId = this.getProperty(LocalStorageKey.USER_ID);
    model.refreshToken = this.getRefreshToken();
    if (model.userId.isEmpty() || model.refreshToken.isEmpty()) {
      const response = new AuthResponse();
      response.code = "unauthorized";
      return of(response);
    }

    this.refreshing = true;
    const url = `${this.getUrl()}/refresh-token?${CommonConstant.DISALLOW_NOTICE}`;
    return this.httpService
      .post<AuthResponse>(url, model)
      .pipe(finalize(() => this.refreshing = false));
  }

  authenticate(callback: Function, config?: MatDialogConfig) {
    if (AuthService.CurrentStatus === AuthStatus.LoggedIn) {
      callback();
      return;
    }

    if (!config) {
      const screenWidth = window.innerWidth * 0.8;
      const screenHeight = window.innerHeight * 0.8;

      const width = 1024;
      const height = window.innerWidth > 768 ? 656 : 400;

      config = new MatDialogConfig();
      config.minWidth = config.width = Math.min(screenWidth, width) + 'px';
      config.minHeight = config.height = Math.min(screenHeight, height) + 'px';
      config.autoFocus = false;
      config.position = { top: '0' };
      config.panelClass = ['slide-dialog'];
      config.data = {
        padding: '24px',
        showTitle: true,
        showImage: window.innerWidth > BreakPoint.MD,
        callback: () => {
          this.dialogRef.close();
          callback();
        }
      }
    }

    this.dialogRef = this.dialog.open(LoginComponent, config);
    this.dialogRef.afterOpened().subscribe(() => document.querySelector('.cdk-overlay-pane.slide-dialog').classList.add('in'));
  }
}
