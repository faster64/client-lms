import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from 'src/app/shared/constants/routing.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(public router: Router) { }

  register() {
    this.router.navigateByUrl(Routing.REGISTER.path);
  }
}
