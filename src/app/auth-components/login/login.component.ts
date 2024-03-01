import { AfterViewInit, Component, Inject, Injectable, Injector, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { PasswordInputComponent } from 'src/app/shared/components/micro/password-input/password-input.component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { LoginRequest } from 'src/app/shared/models/auth/login-request';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
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

  errorMsg = '';

  request = new LoginRequest();

  @ViewChild("email")
  emailInstance!: DxTextBoxComponent;

  @ViewChild("password")
  passwordInstance!: PasswordInputComponent;

  @ViewChild("loginBtn")
  loginBtn!: BaseButton;

  constructor(
    injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public authService: AuthService,
    public publisher: PublisherService
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.emailInstance.instance.focus();
  }

  register = () => {
    this.data?.close();
    this.router.navigateByUrl(Routing.REGISTER.path);
  }

  forgotPassword = () => {
    this.data?.close();
    this.router.navigateByUrl(Routing.FORGOT_PASSWORD.path);
  }

  validate() {
    if (StringHelper.isNullOrEmpty(this.request.username)) {
      this.errorMsg = TranslationService.VALUES['auth']['login']['email_not_valid_msg'];
      this.emailInstance.instance.focus();
      this.emailInstance.instance.option("isValid", false);
      return false;
    }
    this.emailInstance.instance.option("isValid", true);

    if (StringHelper.isNullOrEmpty(this.request.password)) {
      this.errorMsg = TranslationService.VALUES['auth']['login']['password_must_not_empty_msg'];
      this.passwordInstance.password.instance.focus();
      this.passwordInstance.password.instance.option("isValid", false);
      return false;
    }
    this.passwordInstance.password.instance.option("isValid", true);

    return true;
  }

  login() {
    this.errorMsg = '';

    const valid = this.validate();
    if (!valid) {
      SnackBar.danger(new SnackBarParameter(this, 'Lỗi', this.errorMsg, 2000));
      this.loginBtn.finish();
      return;
    }

    this.authService.login(this.request)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.loginBtn.finish())
      )
      .subscribe(
        resp => {
          if (resp.code == 'success') {
            this.authService.saveAuthenticate(resp.data.accessToken, resp.data.refreshToken);
            this.publisher.loggedInEvent.emit();

            if (this.data && this.data.callback) {
              this.data.callback();
            }
            else {
              this.router.navigateByUrl(Routing.HOME.path);
            }
          }
        },
        error => {
          this.errorMsg = error.error.message;
          SnackBar.danger(new SnackBarParameter(this, 'Đăng nhập thất bại!', this.errorMsg));
        }
      )
  }
}
