import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BaseUploaderComponent } from 'src/app/shared/components/micro/uploader/uploader.component';

@Component({
  selector: 'app-cms-upload-course-image',
  templateUrl: './cms-upload-course-image.component.html',
  styleUrls: ['./cms-upload-course-image.component.scss']
})
export class CmsUploadCourseImageComponent {

  @Input()
  url = '';

  @Input()
  readOnly = false;

  @Output()
  upload = new EventEmitter();

  @Output()
  remove = new EventEmitter();

  @ViewChild("uploader")
  uploader: BaseUploaderComponent;

  uploaded(event)  {
    this.url = event.presignedUrls[0];
    this.upload.emit(event);
  }

  removeImage() {
    this.url = '';
    this.uploader.reset();
    this.remove.emit();
  }
}
