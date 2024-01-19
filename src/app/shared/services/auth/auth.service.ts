import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CreateAccount } from 'src/app/models/auth/requests/create-account';
import { SnackBarParameter } from 'src/app/models/snackbar.param';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { HttpService } from 'src/app/shared/services/base/http.service';
import { TransferDataService } from 'src/app/shared/services/base/transfer-data.service';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../../../models/auth/requests/auth-request';
import { RefreshTokenModel } from '../../../models/auth/requests/refresh-token-model';
import { AuthResponse } from '../../../models/auth/responses/auth-response';
import { PaginationRequest } from '../../../models/base/pagination-request';
import { ServiceResult } from '../../../models/base/service-result';
import { SnackBar } from '../../components/element/snackbar/snackbar.component';
import { LocalStorageKey } from '../../constants/localstorage.key';
import { Routing } from '../../constants/routing.constant';
import { SessionStorageKey } from '../../constants/sessionstorage.key';
import { AuthStatus } from '../../enumerations/auth-status.enum';
import { LocalHelper } from '../../helpers/local.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clearListSession = [
    SessionStorageKey.SIDEBAR_INDEX,
    SessionStorageKey.SECRET_KEY,
    SessionStorageKey.SECRET_KEY_EXPIRY,
    SessionStorageKey.SECRET_KEY_EXPIRY_STRING
  ];

  private clearListLocal = [
    LocalStorageKey.UNLOCKED_DIR
  ];

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
      window.location.href = `/${Routing.SIGN_IN.path}?next=${window.location.href}`;
      return;
    }
    window.location.href = `/${Routing.SIGN_IN.path}`;
  }

  isSignedIn() {
    return this.getAuthStatus() === AuthStatus.SignedIn;
  }

  getAuth() {
    return LocalHelper.getAndParse('auth');
  }

  getTenantId() {
    return this.getAuth()[LocalStorageKey.TENANT_ID] || '';
  }

  getUserId() {
    return this.getAuth()[LocalStorageKey.USER_ID] || '';
  }

  getAccessToken() {
    return this.getAuth()[LocalStorageKey.ACCESS_TOKEN] || '';
  }

  getRefreshToken() {
    return this.getAuth()[LocalStorageKey.REFRESH_TOKEN] || '';
  }

  getExpiryTime() {
    return new Date(this.getAuth()[LocalStorageKey.EXP] * 1000).getTime();
  }

  getAuthStatus(): AuthStatus {
    const status = this.getAuth()[LocalStorageKey.AUTH_STATUS];
    switch (status) {
      case 1:
        return AuthStatus.SignedIn;
      case 2:
        return AuthStatus.SignedOut;
      case 3:
        return AuthStatus.SigningOut;
      default:
        return AuthStatus.Unknown;
    }
  }

  setProperty(name: string, value: any) {
    const auth = this.getAuth();

    auth[name] = value;
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  setAuthStatus(status: AuthStatus) {
    this.setProperty(LocalStorageKey.AUTH_STATUS, status);
  }

  removeAccessToken() {
    this.setProperty(LocalStorageKey.ACCESS_TOKEN, '');
  }

  saveAuthenticate(accessToken: string, refreshToken: string) {
    const config = StringHelper.parseJwt(accessToken);
    config[LocalStorageKey.AUTH_STATUS] = AuthStatus.SignedIn;
    config[LocalStorageKey.ACCESS_TOKEN] = accessToken;
    config[LocalStorageKey.REFRESH_TOKEN] = refreshToken;

    localStorage.setItem('auth', JSON.stringify(config));
  }

  ping() {
    const url = `${this.getUrl()}/ping?uid=${this.getUserId()}&${CommonConstant.DISALLOW_NOTICE}`;
    return this.httpService.get<ServiceResult>(url);
  }

  signUp(account: CreateAccount) {
    const url = `${this.getUrl()}/sign-up`;
    return this.httpService.post<ServiceResult>(url, account);
  }

  signIn(request: AuthRequest, allowNotice?: boolean) {
    const url = `${this.getUrl()}/sign-in` + (allowNotice ? '' : `?${CommonConstant.DISALLOW_NOTICE}`);
    return this.httpService.post<ServiceResult>(url, request);
  }

  signInGithub(code: string) {
    const url = `${this.getUrl()}/sign-in-with-github/${code}`;
    return this.httpService.get<ServiceResult>(url);
  }

  getToken(tokenKey: string) {
    const url = `${this.getUrl()}/get-token/${tokenKey}`;
    return this.httpService.get<AuthResponse>(url);
  }

  signOut(callback?: Function) {
    SnackBar.progress(new SnackBarParameter(this, 'Đang đăng xuất', SnackBar.forever));
    const accessToken = this.getAccessToken();

    if (!StringHelper.isNullOrEmpty(accessToken)) {
      this.httpService
        .get<AuthResponse>(`${this.getUrl()}/sign-out`)
        .pipe(
          finalize(() => {
            this.clearAuth();
          })
        )
        .subscribe();
    } else {
      this.clearAuth();
    }
  }

  private clearAuth() {
    localStorage.removeItem('auth');
    this.clearListSession.forEach(item => sessionStorage.removeItem(`${environment.organization}_${item}`));
    this.clearListLocal.forEach(item => localStorage.removeItem(item));
    window.location.href = `/${Routing.SIGN_IN.path}`;
    SnackBar.close();
  }

  refreshToken() {
    const model = new RefreshTokenModel();
    model.userId = this.getUserId() || "";
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

  getSignInLoggingPaging(paginationRequest: PaginationRequest) {
    const page = paginationRequest.number;
    const size = paginationRequest.size;

    const url = `${this.getUrl()}/history-paging?page=${page}&size=${size}`;
    return this.httpService.get<ServiceResult>(url);
  }

  verifySecretKey(secretKey: string, url: string) {
    return this.httpService.get<ServiceResult>(url + `?secretKey=${btoa(secretKey)}`);
  }

  getRequestInformation() {
    const url = `${this.getUrl()}/request-information`;
    return this.httpService.get<ServiceResult>(url);
  }
}
