import { Component } from '@angular/core';
import { ClassService } from 'src/app/shared/services/class/class.service';
import { CmsGridComponent } from '../cms-page-grid.component';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { SortModel } from 'src/app/shared/models/base/sort-model';
import { Class } from 'src/app/shared/models/class/class';

@Component({
  selector: 'app-cms-class',
  templateUrl: './cms-class.component.html',
  styleUrls: ['./cms-class.component.scss']
})
export class CmsClassComponent extends CmsGridComponent<Class> {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Quản lý Lớp học');
    super.ngOnInit();
  }

  override initConfig(): void {
    this.paginationRequest.sort = new SortModel('name', true);
    this.service = this.injector.get(ClassService);
  }

  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'name', displayText: 'Tên khóa học', width: 300 });
  }
}
