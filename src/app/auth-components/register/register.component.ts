import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
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

  fetchingClass = false;

  classes = [];

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
    public router: Router,
    public authService: AuthService,
    public classService: ClassService
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.fullnameInstance.instance.focus();
    // this.request.fullname = 'Nguyễn Văn Cương';
    // this.request.email = 'abc@gmail.com';
    // this.request.phone = '0847884444';
    // this.request.password = '123';
    // this.request.confirmPassword = '123';
  }

  getClassList() {
    this.fetchingClass = true;
    this.classService.getClasses()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.fetchingClass = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.classes = [];
          for (let i = 0; i < resp.data.length; i++) {
            this.classes.push({
              id: resp.data[i],
              name: `Lớp ${resp.data[i]}`
            });
          }
        }
      })
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
      .subscribe(resp => {
        console.log(resp);
        if (resp.code == 'success') {
          MessageBox.information(new Message(this, { content: 'Đăng ký tài khoản thành công. Đăng nhập ngay.' }, () => this.login()));
          this.request = new RegisterRequest();
        }
      })
  }

  validateColumn(column: string, i18n: string) {
    const ref = this[`${column}Instance`] as DxTextBoxComponent;

    if (StringHelper.isNullOrEmpty(this.request[column])) {
      SnackBar.warning(new SnackBarParameter(this, TranslationService.VALUES['auth']['register'][i18n]));
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
      SnackBar.warning(new SnackBarParameter(this, TranslationService.VALUES['auth']['register']['both_password_must_be_the_same']));
      this.passwordInstance.instance.option("isValid", false);
      return false;
    }

    return true;
  }

  login = () => this.router.navigateByUrl(Routing.LOGIN.path);
}
