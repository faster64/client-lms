import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { AuthStatus } from 'src/app/shared/enums/auth-status.enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { SharedService } from 'src/app/shared/services/base/shared.service';
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
  SharedService = SharedService;
  AuthService = AuthService;
  AuthStatus = AuthStatus;

  path = '';

  opened = false;

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
    this.publisher.routeChangeEvent.subscribe(() => this.findModule());
    this.getCartItems();
    this.publisher.updateCartEvent.subscribe(() => this.getCartItems());
  }

  findModule() {
    setTimeout(() => {
      this.path = (this.activatedRoute.snapshot as any)['_routerState']['url'].substring(1);
    }, 100);
  }

  logout() {
    this.authService.logout();
  }

  getCartItems() {
    SharedService.AdjustCarts();
    if (AuthService.CurrentStatus != AuthStatus.LoggedIn) {
    }
  }
}
