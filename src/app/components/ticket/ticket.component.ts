import { Component, Injector, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { finalize, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { ClassSelectorComponent } from 'src/app/shared/components/micro/class-selector/class-selector.component';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { Ticket } from 'src/app/shared/models/ticket/ticket';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { UserService } from 'src/app/shared/services/user/user.service';
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

  @ViewChild("fullName")
  fullNameInstance: DxTextBoxComponent;

  @ViewChild("phoneNumber")
  phoneNumberInstance: DxTextBoxComponent;

  @ViewChild("email")
  emailInstance: DxTextBoxComponent;

  @ViewChild("address")
  addressInstance: DxTextBoxComponent;

  @ViewChild("content")
  contentInstance: DxTextBoxComponent;

  constructor(
    injector: Injector,
    public ticketService: TicketService,
    public userService: UserService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getInfo();
  }

  getInfo() {
    if (AuthService.IsLogged()) {
      this.isLoading = true;
      this.userService
        .getProfile()
        .pipe(
          takeUntil(this._onDestroySub),
          finalize(() => this.isLoading = false)
        )
        .subscribe(resp => {
          if (resp.code == 'success') {
            this.ticket.fullName = resp.data.fullName;
            this.ticket.phoneNumber = resp.data.phoneNumber;
            this.ticket.email = resp.data.email;
          }
        })
    }
  }

  validate() {
    this.fullNameInstance.instance.option("isValid", true);
    this.phoneNumberInstance.instance.option("isValid", true);
    this.emailInstance.instance.option("isValid", true);
    this.addressInstance.instance.option("isValid", true);
    this.contentInstance.instance.option("isValid", true);

    if (StringHelper.isNullOrEmpty(this.ticket.fullName)) {
      SnackBar.danger(new SnackBarParameter(this, 'Gửi thông tin liên hệ thất bại!', 'Vui lòng nhập họ và tên'));
      this.fullNameInstance.instance.option("isValid", false);
      this.fullNameInstance.instance.focus();
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.phoneNumber)) {
      SnackBar.danger(new SnackBarParameter(this, 'Gửi thông tin liên hệ thất bại!', 'Vui lòng nhập số điện thoại'));
      this.phoneNumberInstance.instance.option("isValid", false);
      this.phoneNumberInstance.instance.focus();
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.email)) {
      SnackBar.danger(new SnackBarParameter(this, 'Gửi thông tin liên hệ thất bại!', 'Vui lòng nhập email'));
      this.emailInstance.instance.option("isValid", false);
      this.emailInstance.instance.focus();
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.classId) || this.ticket.classId == '0') {
      SnackBar.danger(new SnackBarParameter(this, 'Gửi thông tin liên hệ thất bại!', 'Vui lòng chọn lớp'));
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.address)) {
      SnackBar.danger(new SnackBarParameter(this, 'Gửi thông tin liên hệ thất bại!', 'Vui lòng nhập địa chỉ'));
      this.addressInstance.instance.option("isValid", false);
      this.addressInstance.instance.focus();
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.ticket.question)) {
      SnackBar.danger(new SnackBarParameter(this, 'Gửi thông tin liên hệ thất bại!', 'Vui lòng nhập nội dung'));
      this.contentInstance.instance.option("isValid", false);
      this.contentInstance.instance.focus();
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
          SnackBar.success(new SnackBarParameter(this, 'Gửi thông tin liên hệ thành công!', 'Cảm ơn bạn đã chia sẻ thông tin liên hệ của mình với chúng tôi tại Cánh Buồm Education. Chúng tôi đã nhận được thông tin của bạn và sẽ phản hồi bạn sớm nhất.'));
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
