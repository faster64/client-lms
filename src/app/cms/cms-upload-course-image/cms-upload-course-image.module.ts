import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsUploadCourseImageComponent } from './cms-upload-course-image.component';
import { BaseUploaderModule } from 'src/app/shared/components/micro/uploader/uploader.module';



@NgModule({
  declarations: [
    CmsUploadCourseImageComponent
  ],
  imports: [
    CommonModule,
    BaseUploaderModule
  ],
  exports: [CmsUploadCourseImageComponent]
})
export class CmsUploadCourseImageModule { }
