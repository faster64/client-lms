import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
import { AuthStatus } from 'src/app/shared/enums/auth-status.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { User } from 'src/app/shared/models/user/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { CartService } from 'src/app/shared/services/order/cart.service';
import { VNPayService } from 'src/app/shared/services/order/vnpay.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent implements AfterViewInit {

  SharedService = SharedService;
  AuthService = AuthService;
  AuthStatus = AuthStatus;

  total = 0;

  user = new User();

  checking = false;

  @ViewChild("payBtn")
  payBtn: BaseButton;

  constructor(
    injector: Injector,
    public publisher: PublisherService,
    public authService: AuthService,
    public userService: UserService,
    public vnpayService: VNPayService,
    public cartService: CartService,
    public router: Router,
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    SharedService.AdjustCarts();

    this.total = SharedService.CartItems.reduce((a, b) => a + b.price, 0);
    if (AuthService.IsLogged()) {
      this.getInformation();
      this.check();
    }
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  getInformation() {
    this.isLoading = true;
    this.userService
      .getProfile()
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

  check() {
    if (!SharedService.CartItems || !SharedService.CartItems.length) {
      return;
    }

    this.checking = true;
    this.cartService
      .check(SharedService.CartItems.map(x => x.id))
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.checking = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          if (resp.data.purchasedIds && resp.data.purchasedIds.length) {
            for (let i = 0; i < SharedService.CartItems.length; i++) {
              const course = SharedService.CartItems[i];
              if (resp.data.purchasedIds.includes(course.id)) {
                course.purchased = true;
              }
            }
            this.total = resp.data.totalPrice;
            MessageBox.information(new Message(this, { content: 'Thông tin giỏ hàng đã thay đổi. Vui lòng kiểm tra lại' }));
          }
        }
      });
  }

  login() {
    this.authService.authenticate(() => {
      this.getInformation();
      this.check();
    });
  }

  removeItem(index) {
    SharedService.CartItems.splice(index, 1);
    localStorage.setItem(LocalStorageKey.CART_ITEMS, JSON.stringify(SharedService.CartItems));

    this.total = SharedService.CartItems.filter(x => !x.purchased).reduce((a, b) => a + b.price, 0);
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
      // type: VNPayType.VnBank,
      fullName: this.user.fullName,
      phoneNumber: this.user.phoneNumber,
      email: this.user.email,
      courseIds: SharedService.CartItems.filter(x => !x.purchased).map(x => x.id)
    };
    if (!data.courseIds.length) {
      MessageBox.information(new Message(this, { content: 'Giỏ hàng đang trống' }));
      this.payBtn.finish();
      return;
    }

    this.vnpayService
      .createUrl(data)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.payBtn.finish())
      )
      .subscribe(
        resp => {
          if (resp.code == 'success') {
            window.location.href = resp.data;
            // this.router.navigateByUrl('/' + Routing.PAYMENT.path + '/' + resp.data.id);
          }
        },
        err => {
          if (err.error.code == 'paid_error') {
            const length = SharedService.CartItems.length;
            SharedService.CartItems = [];
            localStorage.setItem(LocalStorageKey.CART_ITEMS, "");
            MessageBox.information(new Message(this, { content: length > 1 ? 'Các khóa học này bạn đã mua rồi' : 'Khóa học này bạn đã mua rồi' }));
          }
        }
      )

  }
}
