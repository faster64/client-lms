import { Component } from '@angular/core';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { CmsGridComponent } from '../cms-page-grid.component';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';

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


  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'image', displayText: 'Hình ảnh', width: 120, type: FieldType.Image });
    this.displayColumns.push({ column: 'name', displayText: 'Tên khóa học', width: 300 });
    this.displayColumns.push({ column: 'shortDescription', displayText: 'Mô tả ngắn', width: 480 });
    this.displayColumns.push({ column: 'class', displayText: 'Lớp', width: 120 });
    this.displayColumns.push({ column: 'price', displayText: 'Giá', width: 140, type: FieldType.Number });
  }

  override loadData(): void {
    this.dataSource = [
      {
        image: 'https://i.stack.imgur.com/i63aC.gif?s=128&g=1&g&s=32',
        name: 'Python Basics - Python Cơ Bản',
        shortDescription: 'Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình...',
        class: '01',
        price: 20990000
      }
    ];
    for (let i = 0; i < 4; i++) {
      this.dataSource = this.dataSource.concat(this.dataSource);
    }
    this.current = this.dataSource.length;
    this.total = this.dataSource.length;
  }
}
