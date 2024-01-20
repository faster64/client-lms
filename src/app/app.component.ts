import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransferDataService } from './shared/services/base/transfer-data.service';
import { AuthService } from './shared/services/auth/auth.service';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { AuthStatus } from './shared/enums/auth-status.enum';
import { TranslationService } from './shared/services/translation/translation.service';
import { Routing } from './shared/constants/routing.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

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
    public transferService: TransferDataService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.prepareAuthContext();
    this.subcribeEvents();
  }

  subcribeEvents() {
    this.routeChangeListener();
    this.cancelProgessListener();
  }

  cancelProgessListener() {
    this.transferService
      .cancelRouteEvent
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(() => {
        clearInterval(this.iid);
        this.progress = 0;
      }
      );
  }

  routeChangeListener() {
    this.router.events
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(async (event: any) => {
        if (event instanceof NavigationStart) {
          this.progress = 35;
          this.iid = setInterval(() => {
            if (this.progress >= 90) {
              clearInterval(this.iid);
              return;
            }
            this.progress += 1;
          }, 20);
        }

        if (event instanceof NavigationEnd) {
          this.progress = 0;
          if (event.urlAfterRedirects == `/${Routing.HOME.path}`) {
            document.documentElement.style.setProperty("--header-bg", "#305FE8");
          } else {
            document.documentElement.style.setProperty("--header-bg", "#fff");
          }
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
