import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { AuthStatus } from 'src/app/shared/enums/auth-status.enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
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

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.findModule();
  }

  redirect = (path: string) => this.router.navigateByUrl(path);

  findModule() {
  }
}
