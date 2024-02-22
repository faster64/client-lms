import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxTextBoxComponent } from 'devextreme-angular';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseComponent implements AfterViewInit {

  emailValue = '';

  error = '';

  step = 1;

  otp = '';

  countdown = 0;

  @ViewChild("email")
  emailInstance!: DxTextBoxComponent;

  @ViewChild("sendBtn")
  sendBtn!: BaseButton;

  @ViewChild("verifyBtn")
  verifyBtn!: BaseButton;

  constructor(
    injector: Injector,
    public router: Router,
    public authService: AuthService
  ) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.emailInstance.instance.focus();
  }

  login = () => this.router.navigateByUrl(Routing.LOGIN.path);

  send() {
    if(StringHelper.isNullOrEmpty(this.emailValue)) {

    }

    this.error = '';
    this.isLoading = true;
    this.authService
      .sendForgotPasswordCode(this.emailValue)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => {
          this.isLoading = false;
          this.sendBtn?.finish();
        })
      )
      .subscribe(
        resp => {
          if (resp.code == 'success') {
            this.setCountdown(resp.data.disabledTo);
            this.step = 2;
          }
        },
        err => {
          if (err.error.code == 'not_found_email') {
            SnackBar.danger(new SnackBarParameter(this, 'Email không chính xác!', err.error.message, 5000))
            // MessageBox.lms(new Message(this, { title: 'Email không chính xác!', content: err.error.message }), false);
          }
          else {
            if (this.step == 2) {
              SnackBar.danger(new SnackBarParameter(this, 'Lỗi', 'Gửi mã thất bại. Vui lòng thử lại'));
              return;
            }
            this.error = err.error.message;
          }
        }
      )
  }

  setCountdown(to) {
    this.countdown = Math.floor((new Date(to).getTime() - new Date(Date.now()).getTime()) / 1000);
    const id = setInterval(() => {
      if (this.countdown-- == 1) {
        clearInterval(id);
      }
    }, 1000);
  }

  onChanged(otp) {
    this.otp = otp;
    setTimeout(() => {
      if (this.otp.length == 4) {
        this.verifyBtn.clickExecute(null);
      }
    }, 100);
  }

  verify() {
    const title = 'Xác thực thất bại!';
    const msg = 'Mã xác nhận mà bạn đã nhập không chính xác. Vui lòng kiểm tra lại mã chúng tôi gửi trong email và đảm bảo rằng bạn đã nhập đúng.';
    this.isLoading = true;
    this.authService
      .checkFpCode(this.emailValue, this.otp)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => {
          this.isLoading = false;
          this.verifyBtn.finish();
        })
      )
      .subscribe(
        resp => {
          if (resp.code == 'success' && resp.data == true) {
            this.router.navigateByUrl(`/${Routing.CHANGE_PASSWORD.path}?type=2&email=${this.emailValue}&code=${this.otp}`);
          }
          else {
            SnackBar.danger(new SnackBarParameter(this, title, msg, 5000));
          }
        },
        err => SnackBar.danger(new SnackBarParameter(this, title, msg, 5000))
      );
  }
}
