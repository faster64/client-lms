import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseLessonDetailComponent } from './course-lesson-detail/course-lesson-detail.component';
import { CourseLessonListComponent } from './course-lesson-list.component';
import { CourseLessonRoutingModule } from './course-lesson-list-routing.module';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';


@NgModule({
  declarations: [
    CourseLessonListComponent,
    CourseLessonDetailComponent
  ],
  imports: [
    CommonModule,
    CourseLessonRoutingModule,
    BaseButtonModule,
    BaseLoadingModule,
    TranslateModule,
  ]
})
export class CourseLessonListModule { }
