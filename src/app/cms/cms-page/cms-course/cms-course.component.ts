import { Component } from '@angular/core';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { CmsGridComponent } from '../cms-page-grid.component';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { CourseService } from 'src/app/shared/services/course/course.service';
import { CourseStatus } from 'src/app/shared/enums/course-status.enum';

@Component({
  selector: 'app-cms-course',
  templateUrl: './cms-course.component.html',
  styleUrls: ['./cms-course.component.scss']
})
export class CmsCourseComponent extends CmsGridComponent {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Quản lý Khóa học');
    super.ngOnInit();
  }

  override initConfig(): void {
    this.service = this.injector.get(CourseService);
  }

  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'imageUrl', displayText: 'Hình ảnh', width: 120, type: FieldType.Image });
    this.displayColumns.push({ column: 'name', displayText: 'Tên khóa học', width: 300 });
    this.displayColumns.push({ column: 'shortDescription', displayText: 'Mô tả ngắn', width: 480 });
    this.displayColumns.push({ column: 'class', displayText: 'Lớp', width: 120 });
    this.displayColumns.push({ column: 'price', displayText: 'Giá', width: 140, type: FieldType.Number });
    this.displayColumns.push({ column: 'statusText', displayText: 'Trạng thái', width: 160 });
  }

  override filterResponse = (data) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const className = item.status == CourseStatus.Release ? 'release' : item.status == CourseStatus.CommingSoon ? 'comming-soon' : 'inactive';
      item.statusText = `<span class='${className}'>${item.statusText}</span>`;
    }

    return data;
  }
}
