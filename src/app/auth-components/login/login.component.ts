import { AfterViewInit, Component, Inject, Injectable, Injector, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { LoginRequest } from 'src/app/shared/models/auth/login-request';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements AfterViewInit {

  request = new LoginRequest();

  @ViewChild("email")
  emailInstance!: DxTextBoxComponent;

  @ViewChild("password")
  passwordInstance!: DxTextBoxComponent;

  @ViewChild("loginBtn")
  loginBtn!: BaseButton;

  constructor(
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router
  ) {
    super(injector);
    console.log(this.data)
  }

  ngAfterViewInit(): void {
    this.emailInstance.instance.focus();
  }

  register = () => this.router.navigateByUrl(Routing.REGISTER.path);

  forgotPassword = () => this.router.navigateByUrl(Routing.FORGOT_PASSWORD.path);

  validate() {
    console.log(TranslationService.VALUES)
    if (StringHelper.isNullOrEmpty(this.request.username) || !this.request.username.isMail()) {
      SnackBar.warning(new SnackBarParameter(this, TranslationService.VALUES['auth']['login']['email_not_valid_msg']));
      this.emailInstance.instance.focus();
      this.emailInstance.instance.option("isValid", false);
      return false;
    }
    this.emailInstance.instance.option("isValid", true);

    if (StringHelper.isNullOrEmpty(this.request.password)) {
      SnackBar.warning(new SnackBarParameter(this, TranslationService.VALUES['auth']['login']['password_must_not_empty_msg']));
      this.passwordInstance.instance.focus();
      this.passwordInstance.instance.option("isValid", false);
      return false;
    }
    this.passwordInstance.instance.option("isValid", true);

    return true;
  }

  login() {
    const valid = this.validate();
    if (!valid) {
      this.loginBtn.finish();
      return;
    }

    SnackBar.warning(new SnackBarParameter(this, TranslationService.VALUES['auth']['login']['login_info_is_incorrect']));
    this.loginBtn.finish();

  }
}
