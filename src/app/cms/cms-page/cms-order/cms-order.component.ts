import { Component } from '@angular/core';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { Order } from 'src/app/shared/models/orders/order';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { CmsGridComponent } from '../cms-page-grid.component';
import { OrderStatus } from 'src/app/shared/enums/order-status.enum';

@Component({
  selector: 'app-cms-order',
  templateUrl: './cms-order.component.html',
  styleUrls: ['./cms-order.component.scss']
})
export class CmsOrderComponent extends CmsGridComponent<Order> {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Quản lý đơn mua hàng');
    super.ngOnInit();
  }

  override initConfig(): void {
    this.service = this.injector.get(OrderService);
  }

  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'code', displayText: 'Mã đơn hàng', width: 180 });
    this.displayColumns.push({ column: 'fullName', displayText: 'Họ và tên', width: 200 });
    this.displayColumns.push({ column: 'phoneNumber', displayText: 'Số điện thoại', width: 160 });
    this.displayColumns.push({ column: 'purchasedDate', displayText: 'Ngày mua hàng', width: 160, type: FieldType.Date });
    this.displayColumns.push({ column: 'totalPrice', displayText: 'Tổng tiền', width: 160, type: FieldType.Number });
    this.displayColumns.push({ column: 'email', displayText: 'Email', width: 180 });
    this.displayColumns.push({
      column: 'status',
      displayText: 'Trạng thái đơn hàng',
      width: 220,
      type: FieldType.OrderState,
      filters: [
        { id: OrderStatus.Unpaid, text: 'Chưa thanh toán' },
        { id: OrderStatus.WaitConfirm, text: 'Chờ xác nhận' },
        { id: OrderStatus.Paid, text: 'Đã thanh toán' },
      ],
    });
  }

  override filterResponse = (data) => {
    return data;
  }
}
