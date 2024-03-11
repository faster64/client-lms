import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
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

  hasCms = false;

  opened = false;

  searchKey = '';

  @ViewChild("searchInstance")
  searchInstance: DxTextBoxComponent;

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
      this.hasCms = localStorage.getItem(LocalStorageKey.CMS) == 'true';
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

  openSearch(event?) {
    event?.stopPropagation();
    event?.preventDefault();

    SharedService.OpenSearch = true;
    this.opened = false;

    setTimeout(() => {
      this.searchInstance.instance.focus();
    }, 100);
  }

  stopEvent(event) {
    event?.stopPropagation();
    event?.preventDefault();
  }

  search() {
    setTimeout(() => {
      if (SharedService.OpenSearch) {
        window.location.href = `/tim-kiem-khoa-hoc/${this.searchKey}`
      }
    }, 50);
  }
}
