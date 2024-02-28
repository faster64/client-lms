import { Component } from '@angular/core';
import { CmsGridComponent } from '../cms-page-grid.component';
import { User } from 'src/app/shared/models/user/user';
import { Ticket } from 'src/app/shared/models/ticket/ticket';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { TicketStatus } from 'src/app/shared/enums/ticket-status.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';

@Component({
  selector: 'app-cms-ticket',
  templateUrl: './cms-ticket.component.html',
  styleUrls: ['./cms-ticket.component.scss']
})
export class CmsTicketComponent extends CmsGridComponent<Ticket> {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Quản lý Liên hệ');
    super.ngOnInit();
  }

  override initConfig(): void {
    this.service = this.injector.get(TicketService);
  }

  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'fullName', displayText: 'Họ và tên', width: 180 });
    this.displayColumns.push({ column: 'phoneNumber', displayText: 'Số điện thoại', width: 160 });
    this.displayColumns.push({ column: 'email', displayText: 'Email', width: 180 });
    this.displayColumns.push({ column: 'className', displayText: 'Lớp', width: 100 });
    this.displayColumns.push({ column: 'address', displayText: 'Địa chỉ', width: 200 });
    this.displayColumns.push({ column: 'question', displayText: 'Nội dung liên hệ', width: 280 });
    this.displayColumns.push({ column: 'sentDate', displayText: 'Ngày gửi', width: 140, type: FieldType.Date });
    this.displayColumns.push(
      {
        column: 'status',
        displayText: 'Trạng thái',
        width: 220,
        type: FieldType.TicketState,
        filters: [{ id: TicketStatus.Responsed, text: 'Đã phản hồi' }, { id: TicketStatus.NotResponsed, text: 'Chưa phản hồi' }],
        callback: (item, e) => console.log(item, e)
      });
  }
}
