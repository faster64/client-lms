import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { AuthStatus } from 'src/app/shared/enums/auth-status.enum';
import { User } from 'src/app/shared/models/user/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Utility } from 'src/app/shared/utility/utility';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  Routing = Routing;
  Utility = Utility;
  AuthService = AuthService;
  AuthStatus = AuthStatus;

  selectedIndex = 0;

  fullname = '';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public publisher: PublisherService,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.findModule();
    this.getFullname();
    this.publisher.loggedInEvent.subscribe( () => this.getFullname());
  }

  redirect = (path: string) => this.router.navigateByUrl(path);

  findModule() {
  }

  getFullname() {
    this.fullname = this.authService.getProperty(LocalStorageKey.FULL_NAME);
    this.userService.user = new User();
    this.userService.user.fullName = this.fullname;
  }
}
