import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    EditorModule,
    BaseLoadingModule,
    BaseButtonModule,
    TranslateModule
  ]
})
export class CourseDetailModule { }
