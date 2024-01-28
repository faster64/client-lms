import { Component, Injector, ViewChild } from '@angular/core';
import { delay, finalize, of, switchMap, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
import { AuthStatus } from 'src/app/shared/enums/auth-status.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { Course } from 'src/app/shared/models/course/course';
import { User } from 'src/app/shared/models/user/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { Utility } from 'src/app/shared/utility/utility';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent {

  SharedService = SharedService;
  AuthService = AuthService;
  AuthStatus = AuthStatus;

  total = 0;
  user = new User();

  @ViewChild("payBtn")
  payBtn: BaseButton;

  constructor(
    injector: Injector,
    public publisher: PublisherService,
    public authService: AuthService,
    public userService: UserService,
    public paymentService: PaymentService
  ) {
    super(injector);
  }


  override ngOnInit(): void {
    super.ngOnInit();
    SharedService.AdjustCarts();

    this.total = SharedService.CartItems.reduce((a, b) => a + b.price, 0);
    if (AuthService.CurrentStatus == AuthStatus.LoggedIn) {
      this.getInformation();
    }
  }

  getInformation() {
    this.isLoading = true;
    this.userService
      .information()
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.userService.user = resp.data;
          this.user = resp.data;
        }
      });
  }

  login() {
    this.authService.authenticate(() => {
      this.getInformation();
    })
  }

  removeItem(index) {
    SharedService.CartItems.splice(index, 1);
    localStorage.setItem(LocalStorageKey.CART_ITEMS, JSON.stringify(SharedService.CartItems));

    this.total = SharedService.CartItems.reduce((a, b) => a + b.price, 0);
    this.publisher.updateCartEvent.emit();
  }

  validate() {
    if (StringHelper.isNullOrEmpty(this.user.fullName)) {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng nhập họ tên'));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.user.email)) {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng nhập email'));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.user.phoneNumber)) {
      SnackBar.warning(new SnackBarParameter(this, 'Vui lòng nhập số điện thoại'));
      return false;
    }
    return true;
  }

  pay() {
    const valid = this.validate();
    if (!valid) {
      this.payBtn.finish();
      return;
    }

    const data = {
      fullName: this.user.fullName,
      phoneNumber: this.user.phoneNumber,
      email: this.user.email,
      courseIds: SharedService.CartItems.map(x => x.id)
    };
    this.paymentService
      .check(data)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.payBtn.finish()),
        switchMap(resp => {
          return of(true);
        })
      )
      .subscribe(resp => {
        SnackBar.success(new SnackBarParameter(this, 'Tính năng Thanh toán sẽ sớm được hoàn thành', 4000));
      })

  }
}
