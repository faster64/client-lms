import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { catchError, filter, retryWhen, switchMap, take } from 'rxjs/operators';
import { BaseResponse } from 'src/app/models/base/base-response';
import { Mark } from '../../models/core/mark';
import { NotificationType } from '../../models/core/notify-type.enum';
import { Message } from '../../models/message';
import { SnackBarParameter } from '../../models/snackbar.param';
import { MessageBox } from '../components/element/message-box/message-box.component';
import { SnackBar } from '../components/element/snackbar/snackbar.component';
import { CommonConstant } from '../constants/common.constant';
import { AuthStatus } from '../enumerations/auth-status.enum';
import { StringHelper } from '../helpers/string.helper';
import { AuthService } from '../services/auth/auth.service';
import { TranslationService } from '../services/translation/translation.service';
import { SessionStorageKey } from '../constants/sessionstorage.key';
import { SharedService } from '../services/base/shared.service';

@Injectable()
export class RequestHandlingInterceptor implements HttpInterceptor {

  private withoutTokens: string[] = [];
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (SharedService.UnderMaintenanceMode && !request.url.includes('can-connect')) {
      return throwError('');
    }

    request = this.injectToken(request);

    return next.handle(request).pipe(
      retryWhen(errors => errors.pipe(
        switchMap((error: HttpErrorResponse, retryCount: number) => {
          if (request.url.includes(CommonConstant.NO_RETRY)) {
            console.warning(`Http request ${error.url} has been failed with status code = ${error.status} but will not retry because not enabled retry!`);
            return throwError(error);
          }
          if (retryCount >= 1 || error.status.toString().startsWith('4')) {
            console.warning(`Http request ${error.url} has been failed with status code = ${error.status} but will not retry because it's probably a client error!`);
            return throwError(error);
          }
          console.warning(`Http request ${error.url} has been failed with status code = ${error.status}. We will retry after 2s...`);
          return timer(2000);
        })
      )),
      catchError((error: HttpErrorResponse) => this.checkStatus(request, next, error)),
      switchMap(resp => {
        const status = (resp as any).status;
        if (status == null || status == undefined || status == "undefined" || this.isSuccessStatusCode(status)) {
          return of(resp);
        }
        return of(new HttpResponse({ status: 200, body: (resp as any).error })) as unknown as Observable<HttpEvent<unknown>>;
      })
    );
  }

  culture() {
    let result = window.navigator.language;
    switch (result) {
      case "vi":
        return "vi-VN";
      case "en":
        return "en-US";
      default:
        return result;
    }
  }

  injectToken(request: HttpRequest<unknown>) {
    const index = request.url.indexOf("://");
    const protocol = request.url.substring(0, index + 3);
    const path = request.url.substring(index + 3);

    if (this.withoutTokens.includes(request.url))
      return request.clone({
        url: protocol + (path as any).replaceAll('//', '/')
      });

    const header = {
      // 'Content-Type': 'application/json; charset=utf-8',
      // 'Accept': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${this.authService.getAccessToken()}`,
    };

    header['X-Client-Time'] = Date.now() + "";
    header['X-Client-Offset'] = new Date().getTimezoneOffset() * 60000 + "";
    header['Accept-Language'] = this.culture();
    header['Secret-Key'] = sessionStorage.getItem(SessionStorageKey.SECRET_KEY) ?? '';

    return request.clone({
      setHeaders: header,
      url: protocol + (path as any).replaceAll('//', '/')
    });
  }

  handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 1 vài request ko refresh token
    if (request.url.includes("sign-out")) {
      return throwError("");
    }

    // Nếu đang refresh thì request khác đợi
    if (this.authService.refreshing) {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          return next.handle(this.injectToken(request));
        })
      );
    }

    return this.authService.refreshToken().pipe(
      catchError((error: HttpErrorResponse) => {
        return this.refreshInvalid(error);
      }),
      switchMap(response => {
        // nếu refresh token ko hợp lệ thì throw
        if (response.code != 'success') {
          return this.refreshInvalid(response.message);
        }

        this.authService.saveAuthenticate(response.accessToken, response.refreshToken);
        this.refreshTokenSubject.next(response.accessToken);
        return next.handle(this.injectToken(request));
      })
    )
  }

  private refreshInvalid(error) {
    const currentStatus = this.authService.getCurrentStatus();
    if (currentStatus == AuthStatus.SignedIn) {
      SnackBar.danger(new SnackBarParameter(null, TranslationService.VALUES['ERROR']['SESSION_EXPRIED'], 2000));
    }
    this.authService.moveOut(false);
    return throwError(error);
  }

  checkStatus(request: HttpRequest<unknown>, next: HttpHandler, errorResponse: HttpErrorResponse) {
    const response = errorResponse.error as BaseResponse;
    switch (errorResponse.status) {
      case HttpStatusCode.Unauthorized:
        return this.handleUnauthorized(request, next);

      case HttpStatusCode.Forbidden:
        SnackBar.danger(new SnackBarParameter(null, response.message));
        break;

      case HttpStatusCode.ServiceUnavailable:
        MessageBox.information(new Message(this, { content: "This service is currently under maintenance. Please try again in a few minutes!" }));
        break;

      default:
        this.fireNotify(Mark.getMark(request.url), response?.message, (response as any)?.data);
        break;
    }
    return throwError(errorResponse);
    // return of(errorResponse) as unknown as Observable<HttpEvent<unknown>>;
  }

  fireNotify(mark: Mark, message: string, body: any) {
    if (!mark.allowNotice) {
      return;
    }

    // if (error && !StringHelper.isNullOrEmpty(error.type)) {
    //   const handler = RequestErrorMapping.mapping.find(m => m.type == error.type);
    //   if (handler) {
    //     handler.func(error, body);
    //     return;
    //   }
    // }

    message = !StringHelper.isNullOrEmpty(message) ? message : TranslationService.VALUES['ERROR']['UNKNOWN_MSG'];
    switch (mark.notificationType) {
      case NotificationType.MessageBox:
        MessageBox.information(new Message(null, { content: message }));
        break;
      case NotificationType.SnackBarWarning:
        SnackBar.warning(new SnackBarParameter(null, message));
        break;
      default:
        SnackBar.danger(new SnackBarParameter(null, message));
        break;
    }
  }

  isSuccessStatusCode(code) {
    return code >= 200 && code <= 299;
  }
}
