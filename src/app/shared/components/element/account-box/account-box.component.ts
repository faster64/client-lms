import { Component, Injector } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { BaseComponent } from '../../base-component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.scss']
})
export class AccountBoxComponent extends BaseComponent {

  constructor(
    injector: Injector,
    public userService: UserService,
    public authService: AuthService
  ) {
    super(injector);
  }


  signOut() {
    this.authService.logout();
  }
}
