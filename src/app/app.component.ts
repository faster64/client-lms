import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SnackBarParameter } from './models/snackbar.param';
import { SnackBar } from './shared/components/element/snackbar/snackbar.component';
import { AuthResolveConstant } from './shared/constants/auth-resolve.constant';
import { Routing } from './shared/constants/routing.constant';
import { AuthStatus } from './shared/enumerations/auth-status.enum';
import { DeviceType } from './shared/enumerations/device.enum';
import { AuthService } from './shared/services/auth/auth.service';
import { BehaviorService } from './shared/services/base/behavior.service';
import { HubConnectionService } from './shared/services/base/hub-connection.service';
import { SharedService } from './shared/services/base/shared.service';
import { TransferDataService } from './shared/services/base/transfer-data.service';
import { TranslationService } from './shared/services/base/translation.service';
import { NotificationService } from './shared/services/notification/notification.service';
import { TinyEditorService } from './shared/services/tiny-editor/tiny-editor.service';
import { UserService } from './shared/services/user/user.serivce';
import { Utility } from './shared/utility/utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  SharedService = SharedService;

  AuthService = AuthService;

  AuthStatus = AuthStatus;

  DeviceType = DeviceType;

  AuthResolveConstant = AuthResolveConstant;

  inProgress = false;

  progressValue = 35;

  _onDestroySub: Subject<void> = new Subject<void>();

  lostConnection = false;

  scrolled = false;

  isResolving = true;

  lastVisited = Date.now();

  lastLeaved = 0;

  @ViewChild("app", { read: ViewContainerRef, static: true })
  containerRef!: ViewContainerRef;

  @ViewChild("appContent", { static: true })
  appContent!: ElementRef;

  constructor(
    public router: Router,
    public sharedService: SharedService,
    public authService: AuthService,
    public translationService: TranslationService,
    public transferService: TransferDataService,
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    public tinyEditorService: TinyEditorService,
    public hubService: HubConnectionService,
    public notificationService: NotificationService,
    public behaviorService: BehaviorService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('new_token_v1') !== '1') {
      localStorage.removeItem('auth');
      localStorage.setItem('new_token_v1', '1');
      this.authService.moveOut();
    }

    if (environment.production) {
      this.logGreeting();
    }
    this.detectDevice();
    // this.autoRefreshToken();
    this.eventSubscribe();
  }

  eventSubscribe() {
    this.detectInternet();
    this.checkAttendance();
    this.connect();
    this.handleRouteChange();
    this.cancelProgess();
    this.handleResolved();
  }

  connect() {
    this.hubService.connectHub();
  }

  checkAttendance() {
    document.addEventListener('visibilitychange', () => {
      let message = '';
      if (document.hidden) {
        this.lastLeaved = Date.now();
        message = `Rời khỏi app lúc ${new Date(Date.now()).toLocaleString()}`;
      }
      else {
        if (this.lastLeaved == 0) {
          message = `Người dùng vào app, sau đó click ra ngoài và quay lại app lúc ${new Date(Date.now()).toLocaleString()}`;
        } else {
          message = `Quay lại app lúc ${new Date(Date.now()).toLocaleString()}, sau ${(Date.now() - this.lastLeaved) / 1000}s`;
        }
      }
      console.success(message);
      this.behaviorService.collect(message).subscribe();
    });
  }

  handleResolved() {
    this.transferService.resolvedEvent
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(_ => this.isResolving = false);
  }

  cancelProgess() {
    this.transferService.cancelRouteProgressEvent
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(() => this.inProgress = false);
  }

  handleRouteChange() {
    this.router.events.pipe(takeUntil(this._onDestroySub)).subscribe(async (event: any) => {
      if (event instanceof NavigationStart) {
        this.inProgress = true;
        this.progressValue = 35;
        const id = setInterval(() => {
          if (this.progressValue >= 90) {
            clearInterval(id);
            return;
          }
          this.progressValue += 1;
        }, 20);
      }

      if (event instanceof NavigationEnd) {
        const endpoint = event.urlAfterRedirects;
        if (endpoint != `/${Routing.NOT_FOUND.path}`) {
          this.sharedService.lastVisitedScreen = endpoint;
        }
        this.inProgress = false;
      }
    });
  }

  detectDevice() {
    SharedService.DeviceType = Utility.getDevice();
    console.customize(`Detected device type in use: `, (SharedService.DeviceType === DeviceType.Mobile ? '[MOBILE]' : '[DESKTOP]'));
  }

  detectInternet() {
    fromEvent(window, "offline").pipe(takeUntil(this._onDestroySub)).subscribe(() => {
      console.err("Mất kết nối internet");

      this.lostConnection = true;
      SnackBar.warning(new SnackBarParameter(this, 'You are offline', SnackBar.forever));
    });
    fromEvent(window, "online").pipe(takeUntil(this._onDestroySub)).subscribe(() => {
      if (this.lostConnection) {
        console.success("Kết nối internet được phục hồi");

        this.lostConnection = false;
        SnackBar.success(new SnackBarParameter(this, 'Your internet access has been restored', 2000));
      }
    });
  }

  logGreeting() {
    console.customize('%cStop!', 'font-size: 64px; font-weight: bold; color: red; padding: 64px');
  }

  appClick(event) {
    this.transferService.appClickEvent.emit(event);
  }

  autoRefreshToken() {
    setInterval(() => {
      if (this.authService.isSignedIn() && !this.authService.refreshing && (this.authService.getExpiryTime() - new Date().getTime() <= 90000)) {
        console.customize(`the system is auto-refreshing access token because it will expire in 90 seconds`);
        this.authService.refreshToken().subscribe(resp => {
          this.authService.refreshing = false;
          if (resp.code == 'success') {
            this.authService.saveAuthenticate(resp.accessToken, resp.refreshToken);
          }
        });
      }
    }, 8000);
  }

  ngOnDestroy(): void {
    // unsubscribe khi destroy
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }
}
