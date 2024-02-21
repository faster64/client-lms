import { Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { Order } from 'src/app/shared/models/orders/order';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends BaseComponent {

  order = new Order();

  @ViewChild("payBtn")
  payBtn: BaseButton;

  constructor(
    injector: Injector,
    public orderService: OrderService,
    public router: Router
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();
    this.order.id = this.activatedRoute.snapshot.params['id'];
    this.load();
  }

  load() {
    this.isLoading = true;
    this.orderService
      .byId(this.order.id)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.order = resp.data;
          if (this.order.status == OrderStatus.Paid) {
            MessageBox
              .information(new Message(this, { content: 'Đơn hàng này đã được thanh toán trước đó!' }))
              .subscribe(() => this.router.navigateByUrl(Routing.CART.path));
          }
        }
      });
  }

  confirmPaid() {
    MessageBox.confirm(new Message(this, { content: 'Bạn đã thanh toán?' }, () => {
      this.orderService
        .requestConfirm(this.order.id)
        .pipe(
          takeUntil(this._onDestroySub),
          finalize(() => this.payBtn.finish())
        )
        .subscribe(resp => {
          if (resp.code == 'success') {
            MessageBox.information(new Message(this, { content: 'Đã gửi yêu cầu xác nhận thanh toán. Chúng tôi sẽ xử lý yêu cầu của bạn trong thời gian sớm nhất. Xin cảm ơn!' }));
            localStorage.removeItem(LocalStorageKey.CART_ITEMS);
            SharedService.CartItems = [];
          }
        });
    })).subscribe(() => this.payBtn.finish());
  }
}
