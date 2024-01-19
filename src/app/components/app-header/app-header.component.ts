import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { AuthStatus } from 'src/app/shared/enums/auth-status.enum';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  Routing = Routing;
  AuthService = AuthService;
  AuthStatus = AuthStatus;
  selectedIndex = 0;

  constructor(public router: Router) {
  }

  redirect = (path: string) => this.router.navigateByUrl(path);
}
