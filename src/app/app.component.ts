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
    this.authService.authenticate((e) => {
      console.log(e);
    });
  }

  subcribeEvents() {
    this.routeChangeListener();
  }

  routeChangeListener() {
    this.router.events
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(async (event: any) => {
        if (event instanceof NavigationStart) {
          this.progress = 50;
          this.iid = setInterval(() => {
            if (this.progress >= 90) {
              clearInterval(this.iid);
              return;
            }
            this.progress += 1;
          }, 20);
        }

        if (event instanceof NavigationEnd) {
          this.progress = 80;
          setTimeout(() => {
            clearInterval(this.iid);
            this.progress = 0;
          }, 300);

          if (event.urlAfterRedirects.startsWith(`/${Routing.CMS.path}`)) {
            AppComponent.Mode = 'cms';
            return;
          }
          AppComponent.Mode = 'user';

          this.publisher.routeChangeEvent.emit();
          if (event.urlAfterRedirects == `/${Routing.HOME.path}`) {
            SharedService.AtHome = true;
            document.documentElement.style.setProperty("--header-bg", "#305FE8");
          } else {
            SharedService.AtHome = false;
            document.documentElement.style.setProperty("--header-bg", "#fff");
          }
          window.scrollTo(0, 0);
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
