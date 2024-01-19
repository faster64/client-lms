import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransferDataService } from './shared/services/base/transfer-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  _onDestroySub: Subject<void> = new Subject<void>();

  progress = 0;

  lostConnection = false;

  @ViewChild("app", { read: ViewContainerRef, static: true })
  containerRef!: ViewContainerRef;

  @ViewChild("appContent", { static: true })
  appContent!: ElementRef;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public transferService: TransferDataService
  ) { }

  ngOnInit() {
    this.subcribeEvents();
  }

  subcribeEvents() {
    this.routeChangeListener();
    this.cancelProgessListener();
  }

  cancelProgessListener() {
    this.transferService
      .cancelRouteProgressEvent
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(() => this.progress = 0);
  }

  routeChangeListener() {
    this.router.events
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(async (event: any) => {
        if (event instanceof NavigationStart) {
          this.progress = 35;
          const id = setInterval(() => {
            if (this.progress >= 90) {
              clearInterval(id);
              return;
            }
            this.progress += 1;
          }, 20);
        }

        if (event instanceof NavigationEnd) {
          this.progress = 0;
        }
      });
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
