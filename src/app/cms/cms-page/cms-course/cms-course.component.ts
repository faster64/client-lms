import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { ColumnGrid } from 'src/app/shared/models/grid/column-grid';

@Component({
  selector: 'app-cms-course',
  templateUrl: './cms-course.component.html',
  styleUrls: ['./cms-course.component.scss']
})
export class CmsCourseComponent extends BaseComponent {

  displayColumns: ColumnGrid[] = [];

  current = 0;

  total = 0;

  courses = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.initColumns();
  }


  initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'image', displayText: 'Hình ảnh', width: 120, type: FieldType.Image });
    this.displayColumns.push({ column: 'name', displayText: 'Tên khóa học', width: 300 });
    this.displayColumns.push({ column: 'shortDescription', displayText: 'Mô tả ngắn', width: 480 });
    this.displayColumns.push({ column: 'class', displayText: 'Lớp', width: 120 });
    this.displayColumns.push({ column: 'price', displayText: 'Giá', width: 140, type: FieldType.Number });

    this.courses = [
      {
        image: 'https://i.stack.imgur.com/i63aC.gif?s=128&g=1&g&s=32',
        name: 'Python Basics - Python Cơ Bản',
        shortDescription: 'Python là một ngôn ngữ lập trình bậc cao cho các mục đích lập trình...',
        class: '01',
        price: 20990000
      }
    ];
    for (let i = 0; i < 4; i++) {
      this.courses = this.courses.concat(this.courses);
    }
    this.current = this.courses.length;
    this.total = this.courses.length;
  }
}
