import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { SelectorComponent } from 'src/app/shared/components/micro/selector/selector.component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { RegisterRequest } from 'src/app/shared/models/auth/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements AfterViewInit {

  request = new RegisterRequest();

  @ViewChild("fullname")
  fullnameInstance!: DxTextBoxComponent;

  @ViewChild("email")
  emailInstance!: DxTextBoxComponent;

  @ViewChild("phone")
  phoneInstance!: DxTextBoxComponent;

  @ViewChild("class")
  classInstance!: SelectorComponent;

  @ViewChild("password")
  passwordInstance!: DxTextBoxComponent;

  @ViewChild("confirmPassword")
  confirmPasswordInstance!: DxTextBoxComponent;

  @ViewChild("registerBtn")
  registerBtn!: BaseButton;

  constructor(
    injector: Injector,
    public router: Router
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.fullnameInstance.instance.focus();
  }

  register() {
  }

  login = () => this.router.navigateByUrl(Routing.LOGIN.path);
}
