import { Component, Injector } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { BaseComponent } from '../../base-component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { User } from 'src/app/shared/models/user/user';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
import { delay, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.scss']
})
export class AccountBoxComponent extends BaseComponent {

  user = new User();

  constructor(
    injector: Injector,
    public userService: UserService,
    public authService: AuthService,
    public publisher: PublisherService
  ) {
    super(injector);
  }


  override ngOnInit(): void {
    super.ngOnInit();
    this.getInformation();
    this.publisher.loggedInEvent.subscribe(() => this.getInformation());
  }

  logout() {
    this.authService.logout();
  }

  getInformation() {
    this.isLoading = true;
    this.userService
      .getProfile()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.userService.user = resp.data;
          this.user = resp.data;
        }
      })
  }
}
