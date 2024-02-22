import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { BaseButton } from 'src/app/shared/components/micro/button/button.component';
import { ClassSelectorComponent } from 'src/app/shared/components/micro/class-selector/class-selector.component';
import { Routing } from 'src/app/shared/constants/routing.constant';
import { TicketStatus } from 'src/app/shared/enums/ticket-status.enum';
import { StringHelper } from 'src/app/shared/helpers/string.helper';
import { ServiceResult } from 'src/app/shared/models/base/service-result';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { SnackBar } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarParameter } from 'src/app/shared/snackbar/snackbar.param';
import { CmsFormComponent } from '../../cms-page-form.component';

@Component({
  selector: 'app-cms-ticket-form',
  templateUrl: './cms-ticket-form.component.html',
  styleUrls: ['./cms-ticket-form.component.scss']
})
export class CmsTicketFormComponent extends CmsFormComponent implements AfterViewInit {

  TicketStatus = TicketStatus;

  @ViewChild("response")
  response!: DxTextBoxComponent;

  @ViewChild("selector")
  selector!: ClassSelectorComponent;

  @ViewChild("saveBtn")
  saveBtn!: BaseButton;

  override ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
  }

  override initConfig(): void {
    super.initConfig();
    this.path = Routing.CMS_TICKET.path;
    this.service = this.injector.get(TicketService);
  }

  override loaded = () => {
    this.selector.value = this.data.classId;
    this.selector.getClassList();
    if (this.data.status != TicketStatus.Responsed) {
      this.response.instance.focus();
      this.publisher.updateCmsHeaderLabelEvent.emit('Yêu cầu liên hệ chưa phản hồi');
    }
    else {
      this.publisher.updateCmsHeaderLabelEvent.emit('Yêu cầu liên hệ đã phản hồi');
    }
  }

  override filterResponse = (data: any) => {
    if (data.class) {
      data['className'] = data.class.name;
    } else {
      data.class = {};
    }
    return data;
  }

  override validate = () => {
    if (this.data.status == TicketStatus.Responsed) {
      return false;
    }
    if (StringHelper.isNullOrEmpty(this.data.response)) {
      SnackBar.warning(new SnackBarParameter(this, 'Cảnh báo', 'Nội dung phản hồi không được để trống'));
      this.saveBtn.finish();
      this.response.instance.focus();
      return false;
    }

    return true;
  };

  override afterSave(resp: ServiceResult): void {
    if (resp.code == 'success') {
      SnackBar.success(new SnackBarParameter(this, 'Thông báo', 'Phản hồi thành công'));
      this.saveBtn.finish();
      this.loadData();
    }
  }
}
