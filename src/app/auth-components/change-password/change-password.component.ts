import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { PasswordInputComponent } from 'src/app/shared/components/micro/password-input/password-input.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseComponent implements AfterViewInit {

  type = '';

  email = '';

  code = '';

  oldPassword = '';

  password = '';

  confirmPassword = '';

  error = '';

  @ViewChild("opw")
  oldPasswordInstance!: PasswordInputComponent;

  @ViewChild("pw")
  passwordInstance!: PasswordInputComponent;

  @ViewChild("cpw")
  confirmPasswordInstance!: PasswordInputComponent;

  @ViewChild("verifyBtn")
  verifyBtn!: BaseButton;

  constructor(
    injector: Injector,
    public router: Router,
    public authService: AuthService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.type = this.activatedRoute.snapshot.queryParams['type'] ?? '1';
    if (AuthService.IsLogged()) {
      this.type = '1';
    }

    if (this.type == '2') {
      this.email = this.activatedRoute.snapshot.queryParams['email'];
      this.code = this.activatedRoute.snapshot.queryParams['code'];
    }
  }

  ngAfterViewInit(): void {
    if (this.type == '1') {
      this.oldPasswordInstance.password.instance.focus();
    }
    else {
      this.passwordInstance.password.instance.focus();
    }
  }

  change() {
    this.error = '';
    this.passwordInstance.password.instance.option("isValid", true);
    this.confirmPasswordInstance.password.instance.option("isValid", true);

    if (this.confirmPassword != this.password) {
      this.error = 'Mật khẩu phải giống với mật khẩu xác nhận';
      this.confirmPasswordInstance.password.instance.option("isValid", false);
      this.confirmPasswordInstance.password.instance.focus();
      this.verifyBtn.finish();
      return;
    }

    const api = this.type == '1' ?
      this.authService.changePassword({ oldPassword: this.oldPassword, newPassword: this.password }) :
      this.authService.changePasswordByCode({ email: this.email, newPassword: this.password, code: this.code });
    api
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => {
          this.isLoading = false;
          this.verifyBtn.finish();
        })
      )
      .subscribe(
        resp => {
          if (resp.code == 'success') {
            MessageBox.lms(new Message(this, { title: 'Thay đổi mật khẩu thành công!', content: 'Mật khẩu đã của bạn đã được thay đổi' }), true);
            this.oldPassword = '';
            this.password = '';
            this.confirmPassword = '';
            if (this.type == '2') {
              this.router.navigateByUrl('/' + this.Routing.LOGIN.path);
            }
          }
        },
        err => MessageBox.lms(new Message(this, { title: 'Xác thực thất bại!', content: err.error.message }), false)
      );
  }
}

