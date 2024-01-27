import { Component, Injector } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { BaseComponent } from '../../base-component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { User } from 'src/app/shared/models/user/user';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';

@Component({
  selector: 'app-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.scss']
})
export class AccountBoxComponent extends BaseComponent {

  fullname = '';

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
    this.getFullname();
    this.publisher.loggedInEvent.subscribe( () => this.getFullname());
  }

  logout() {
    this.authService.logout();
  }

  getFullname() {
    this.fullname = this.authService.getProperty(LocalStorageKey.FULL_NAME);
    this.userService.user = new User();
    this.userService.user.fullName = this.fullname;
  }
}
