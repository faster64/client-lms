import { Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage-key.constant';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { BillStatus } from 'src/app/shared/enums/bill-status.enum';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';
import { Bill } from 'src/app/shared/models/bills/bill';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { BillService } from 'src/app/shared/services/bill/bill.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends BaseComponent {

  bill = new Bill();

  @ViewChild("payBtn")
  payBtn: BaseButton;

  constructor(
    injector: Injector,
    public billService: BillService,
    public router: Router
  ) {
    super(injector);
  }

  override initData(): void {
    super.initData();
    this.bill.id = this.activatedRoute.snapshot.params['id'];
    this.load();
  }

  load() {
    this.isLoading = true;
    this.billService
      .byId(this.bill.id)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.bill = resp.data;
          if (this.bill.status == BillStatus.Paid) {
            MessageBox
              .information(new Message(this, { content: 'Đơn hàng này đã được thanh toán trước đó!' }))
              .subscribe(() => this.router.navigateByUrl(Routing.CART.path));
          }
        }
      });
  }

  confirmPaid() {
    MessageBox.confirm(new Message(this, { content: 'Bạn đã thanh toán?' }, () => {
      this.billService
        .requestConfirm(this.bill.id)
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
