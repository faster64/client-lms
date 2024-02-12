import { Component, Injector } from '@angular/core';
import { catchError, finalize, takeUntil, throwError } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Social } from 'src/app/shared/models/social/social';
import { SocialService } from 'src/app/shared/services/social/social.service';

@Component({
  selector: 'app-ballon',
  templateUrl: './ballon.component.html',
  styleUrls: ['./ballon.component.scss']
})
export class BallonComponent extends BaseComponent {

  loadSuccess = true;

  social = new Social();

  constructor(
    injector: Injector,
    public socialService: SocialService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.load();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  load() {
    this.isLoading = true;
    this.loadSuccess = true;
    this.socialService
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        catchError(err => {
          this.loadSuccess = false;
          return throwError(err);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.social = resp.data;
        }
      });
  }
}
