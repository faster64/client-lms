import { Component } from '@angular/core';
import { Course } from 'src/app/shared/models/course/course';
import { CmsGridComponent } from '../cms-page-grid.component';
import { Lesson } from 'src/app/shared/models/lesson/lesson';
import { PublisherService } from 'src/app/shared/services/base/publisher.service';
import { LessonService } from 'src/app/shared/services/lesson/lesson.service';
import { FieldType } from 'src/app/shared/enums/field-type.enum';

@Component({
  selector: 'app-cms-lesson',
  templateUrl: './cms-lesson.component.html',
  styleUrls: ['./cms-lesson.component.scss']
})
export class CmsLessonComponent extends CmsGridComponent<Lesson> {

  override ngOnInit(): void {
    this.injector.get(PublisherService).updateCmsHeaderLabelEvent.emit('Quản lý bài giảng');
    super.ngOnInit();
  }

  override initConfig(): void {
    this.service = this.injector.get(LessonService);
  }

  override initColumns() {
    this.displayColumns = [];
    this.displayColumns.push({ column: 'imageUrl', displayText: 'Hình ảnh', width: 160, type: FieldType.Image });
    this.displayColumns.push({ column: 'name', displayText: 'Tên bài giảng', width: 300 });
    this.displayColumns.push({ column: 'description', displayText: 'Mô tả', width: 440 });
    this.displayColumns.push({ column: 'fileUrl', displayText: 'File đính kèm', width: 240, type: FieldType.Pdf });
  }

  override filterResponse = (data) => {
    for(let i = 0; i < data.length; i++) {
      const item = data[i];
      item['fileUrl_name'] = item['fileName'];
    }
    return data;
  }
}
