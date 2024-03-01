import { Component } from '@angular/core';
import { ReportStudentItemModel } from 'src/app/shared/models/report/report-student';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { UserClientService } from 'src/app/shared/services/user/user-client.service';
import { CmsGridComponent } from '../cms-page-grid.component';

@Component({
  selector: 'app-cms-report',
  templateUrl: './cms-report.component.html',
  styleUrls: ['./cms-report.component.scss']
})
export class CmsReportComponent extends CmsGridComponent<ReportStudentItemModel> {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Báo cáo thống kê');
    super.ngOnInit();
  }

  override initConfig(): void {
    this.service = this.injector.get(UserClientService);
  }

  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'fullName', displayText: 'Họ và tên', width: 350 });
    this.displayColumns.push({ column: 'phoneNumber', displayText: 'Số điện thoại', width: 200 });
    this.displayColumns.push({ column: 'email', displayText: 'Email', width: 240 });
    this.displayColumns.push({ column: 'className', displayText: 'Lớp', width: 140});
  }
}

