import { Component, Injector, OnInit } from '@angular/core';
import { delay, finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { Social } from 'src/app/shared/models/social/social';
import { SocialService } from 'src/app/shared/services/social/social.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent extends BaseComponent {

  social = new Social();

  constructor(
    injector: Injector,
    public socialService: SocialService
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();
    this.load();
  }

  load() {
    this.isLoading = true;
    this.socialService
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.social = resp.data;
        }
      });
  }
}
