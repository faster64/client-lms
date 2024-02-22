import { Component, Injector, ViewChild } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { Ticket } from 'src/app/shared/models/ticket/ticket';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent extends BaseComponent {

  ticket = new Ticket();

  @ViewChild("sendBtn")
  sendBtn: BaseButton;

  constructor(
    injector: Injector,
    public ticketService: TicketService
  ) {
    super(injector);
  }

  validate() {
    if (StringHelper.isNullOrEmpty(this.ticket.fullName)) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Vui lòng nhập họ và tên'));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.phoneNumber)) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Vui lòng nhập số điện thoại'));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.email)) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Vui lòng nhập email'));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.classId) || this.ticket.classId == '0') {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Vui lòng chọn lớp'));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.address)) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Vui lòng nhập địa chỉ'));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.question)) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Vui lòng nhập nội dung'));
      return false;
    }
    return true;
  }

  send() {
    const valid = this.validate();
    if (!valid) {
      this.sendBtn.finish();
      return;
    }

    this.ticketService
      .save(this.ticket)
      .pipe(
        takeUntil(this._onDestroySub),
        finalize(() => this.sendBtn.finish())
      )
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.ticket = new Ticket();
          SnackBar.success(new SnackBarParameter(this, 'Thông báo', 'Gửi thông tin thành công'));
        }
      })
  }

  random() {
    this.ticket.fullName = 'Đá Gà ' + this.Utility.randomInRange(1, 1000);
    this.ticket.phoneNumber = '0868668' + this.Utility.randomInRange(1, 9) + this.Utility.randomInRange(1, 9) + this.Utility.randomInRange(1, 9);
    this.ticket.email = 'daga' + this.Utility.randomInRange(1, 10000) + '@gmail.com';
    this.ticket.address = 'Châu Phong, Quế Võ, Bắc Ninh';
    this.ticket.question = 'Hãy giúp tôi ' + this.Utility.randomInRange(1, 10000);
    this.ticket.classId = "1198874194058674176";
  }
}
