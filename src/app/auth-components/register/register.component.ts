import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { PasswordInputComponent } from 'src/app/shared/components/micro/password-input/password-input.component';
import { SelectorComponent } from 'src/app/shared/components/micro/selector/selector.component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { RegisterRequest } from 'src/app/shared/models/auth/register-request';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ClassService } from 'src/app/shared/services/class/class.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

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
  passwordInstance!: PasswordInputComponent;

  @ViewChild("confirmPassword")
  confirmPasswordInstance!: PasswordInputComponent;

  @ViewChild("registerBtn")
  registerBtn!: BaseButton;

  constructor(
    injector: Injector,
    public router: Router,
    public authService: AuthService,
    public classService: ClassService
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.fullnameInstance.instance.focus();
    // this.request.fullname = 'Nguyễn Văn Cương';
    // this.request.email = 'abc' + Math.random() * 100 + '@gmail.com';
    // this.request.phone = '0847884444';
    // this.request.password = '123';
    // this.request.confirmPassword = '123';
  }


  register() {
    const valid = this.validate();
    if (!valid) {
      this.registerBtn.finish();
      return;
    }
    this.authService.register(this.request)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.registerBtn.finish())
      )
      .subscribe(
        resp => {
          if (resp.code == 'success') {
            const title = 'Đăng ký tài khoản thành công!';
            const content = 'Bạn đã đăng ký thành công tài khoản tại Cánh Buồm Education. Hãy đăng nhập để trải nghiệm các khóa học của chúng tôi.';
            MessageBox.lms(new Message(this, { title: title, content: content }, () => this.login()), true);
            this.request = new RegisterRequest();
          }
        },
        err => console.log(err)
      )
  }

  validateColumn(column: string, i18n: string) {
    let ref: DxTextBoxComponent;
    if (column != 'password' && column != 'confirmPassword') {
      ref = this[`${column}Instance`] as DxTextBoxComponent
    } else {
      ref = (this[`${column}Instance`] as PasswordInputComponent).password;
    }

    if (StringHelper.isNullOrEmpty(this.request[column])) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', TranslationService.VALUES['auth']['register'][i18n]));
      ref.instance.focus();
      ref.instance.option("isValid", false);
      return false;
    }
    ref.instance.option("isValid", true);
    return true;
  }

  validate() {
    let valid = this.validateColumn('fullname', 'fullname_must_not_be_empty_msg');
    if (!valid) return false;

    valid = this.validateColumn('email', 'email_not_valid_msg');
    if (!valid) return false;

    valid = this.validateColumn('phone', 'phone_must_not_be_empty_msg');
    if (!valid) return false;

    valid = this.validateColumn('password', 'password_not_valid_msg');
    if (!valid) return false;

    valid = this.validateColumn('confirmPassword', 'confirm_password_not_valid_msg');
    if (!valid) return false;

    if (this.request.password != this.request.confirmPassword) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', TranslationService.VALUES['auth']['register']['both_password_must_be_the_same']));
      this.confirmPasswordInstance.password.instance.option("isValid", false);
      return false;
    }

    return true;
  }

  login = () => this.router.navigateByUrl(Routing.LOGIN.path);
}
