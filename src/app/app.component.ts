import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Routing } from './shared/constants/routing.constant';
import { AuthStatus } from './shared/enums/auth-status.enum';
import { AuthService } from './shared/services/auth/auth.service';
import { PublisherService } from './shared/services/base/publisher.service';
import { SharedService } from './shared/services/base/shared.service';
import { HubConnectionService } from './shared/services/socket/hub-connection.service';
import { TranslationService } from './shared/services/translation/translation.service';
import { SnackBar } from './shared/snackbar/snackbar.component';
import { SnackBarParameter } from './shared/snackbar/snackbar.param';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  AppComponent = AppComponent;

  public static Mode = '';

  _onDestroySub: Subject<void> = new Subject<void>();

  progress = 0;

  lostConnection = false;

  iid: any;

  @ViewChild("app", { read: ViewContainerRef, static: true })
  containerRef!: ViewContainerRef;

  @ViewChild("appContent", { static: true })
  appContent!: ElementRef;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public translationService: TranslationService,
    public publisher: PublisherService,
    public authService: AuthService,
    public hubService: HubConnectionService,
  ) { }

  ngOnInit() {
    this.prepareAuthContext();
    // this.authService.setProperty('access_token', '');
    this.subcribeEvents();
    this.hubService.connectHub();
  }

  subcribeEvents() {
    this.routeChangeListener();
  }

  routeChangeListener() {
    this.router.events
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(async (event: any) => {
        if (event instanceof NavigationStart) {
          this.progress = 70;
          this.iid = setInterval(() => {
            if (this.progress < 90) {
              this.progress += 1;
            }
          }, 20);
        }

        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this.progress = 0;
            clearInterval(this.iid);
          }, 300);

          if (event.urlAfterRedirects.startsWith(`/${Routing.CMS.path}`)) {
            AppComponent.Mode = 'cms';
            return;
          }
          AppComponent.Mode = 'user';

          this.publisher.routeChangeEvent.emit();
          if (event.urlAfterRedirects == `/${Routing.HOME.path}`) {
            SharedService.AtHome = true;
            AppComponent.Mode = 'home';
            document.documentElement.style.setProperty("--header-bg", "#305FE8");
          } else {
            SharedService.AtHome = false;
            document.documentElement.style.setProperty("--header-bg", "#fff");
          }
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
        }
      });
  }

  prepareAuthContext() {
    AuthService.CurrentStatus = this.authService.getCurrentStatus();
    if (AuthService.CurrentStatus == AuthStatus.Unknown) {
      AuthService.CurrentStatus = AuthStatus.LoggedOut;
    }
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
