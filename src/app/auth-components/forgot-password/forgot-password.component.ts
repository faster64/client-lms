import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { Utility } from 'src/app/shared/utility/utility';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements AfterViewInit {

  emailValue = '';

  @ViewChild("email")
  emailInstance!: DxTextBoxComponent;

  constructor(public router: Router) {}

  ngAfterViewInit(): void {
    this.emailInstance.instance.focus();
  }

  login = () => this.router.navigateByUrl(Routing.LOGIN.path);

  send() {
    Utility.featureIsInDevelopment(null);
  }
}
