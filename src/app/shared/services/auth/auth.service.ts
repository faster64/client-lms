import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth-components/login/login.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { HttpService } from 'src/app/shared/services/base/http.service';
import { TransferDataService } from 'src/app/shared/services/base/transfer-data.service';
import { environment } from 'src/environments/environment';
import { LocalStorageKey } from '../../constants/localstorage-key.constant';
import { Routing } from '../../constants/routing.constant';
import { AuthStatus } from '../../enums/auth-status.enum';
import { LocalHelper } from '../../helpers/local.helper';
import { BreakPoint } from '../../constants/break-point.constant';

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
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog
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






  authenticate(callback: Function, config?: MatDialogConfig) {
    if (AuthService.CurrentStatus === AuthStatus.LoggedIn) {
      callback();
      return;
    }
    if (!config) {
      const screenWidth = window.innerWidth * 0.8;
      const screenHeight = window.innerHeight * 0.8;

      config = new MatDialogConfig();
      config.minWidth = config.width = Math.min(screenWidth, 1024) + 'px';
      config.minHeight = config.height = Math.min(screenHeight, 656) + 'px';
      config.autoFocus = false;
      config.position = { top: '0' };
      config.panelClass = ['slide-dialog'];
      config.data = {
        padding: '24px',
        showTitle: false,
        showImage: window.innerWidth > BreakPoint.MD
      }
    }

    const ref = this.dialog.open(LoginComponent, config);
    ref.afterOpened().subscribe(() => document.querySelector('.cdk-overlay-pane.slide-dialog').classList.add('in'));
  }
}
