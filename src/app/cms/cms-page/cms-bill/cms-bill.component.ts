import { Component } from '@angular/core';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { Bill } from 'src/app/shared/models/bills/bill';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { BillService } from 'src/app/shared/services/bill/bill.service';
import { CmsGridComponent } from '../cms-page-grid.component';

@Component({
  selector: 'app-cms-bill',
  templateUrl: './cms-bill.component.html',
  styleUrls: ['./cms-bill.component.scss']
})
export class CmsBillComponent extends CmsGridComponent<Bill> {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Quản lý đơn mua hàng');
    super.ngOnInit();
  }

  override initConfig(): void {
    this.service = this.injector.get(BillService);
  }

  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'code', displayText: 'Mã đơn hàng', width: 180 });
    this.displayColumns.push({ column: 'totalPrice', displayText: 'Đơn giá', width: 160, type: FieldType.Number });
    this.displayColumns.push({ column: 'fullName', displayText: 'Họ và tên', width: 200 });
    this.displayColumns.push({ column: 'phoneNumber', displayText: 'Số điện thoại', width: 160 });
    this.displayColumns.push({ column: 'email', displayText: 'Email', width: 180 });
    this.displayColumns.push({ column: 'purchasedDate', displayText: 'Ngày mua hàng', width: 160, type: FieldType.Date });
    this.displayColumns.push({ column: 'status', displayText: 'Trạng thái đơn hàng', width: 220, type: FieldType.BillState });
  }

  override filterResponse = (data) => {
    return data;
  }
}
