import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { CmsFormComponent } from '../../cms-page-form.component';
import { FormMode } from 'src/app/shared/enums/form-mode.enum';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';
import { finalize, takeUntil } from 'rxjs';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { MessageBox } from 'src/app/shared/message-box/message-box.component';
import { Message } from 'src/app/shared/message-box/model/message';

@Component({
  selector: 'app-cms-order-view',
  templateUrl: './cms-order-view.component.html',
  styleUrls: ['./cms-order-view.component.scss']
})
export class CmsOrderViewComponent extends CmsFormComponent implements AfterViewInit {

  OrderStatus = OrderStatus;

  @ViewChild("confirmBtn")
  confirmBtn: BaseButton;

  constructor(
    injector: Injector,
    public orderService: OrderService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (this.formMode != FormMode.View) {
    }
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_ORDER.path;
    this.service = this.injector.get(OrderService);
  }

  override save(): void {
    MessageBox.confirm(new Message(this, { content: 'Xác nhận thanh toán đơn hàng này?' }, () => {
      this.orderService
        .confirm(this.data.id)
        .pipe(
          takeUntil(this._onDestroySub),
          finalize(() => this.confirmBtn.finish())
        )
        .subscribe(resp => {
          if (resp.code == 'success') {
            SnackBar.success(new SnackBarParameter(this, 'Xác nhận thành công'));
            this.loadData();
          }
        });
    })).subscribe(() => this.confirmBtn.finish());
  }
}

