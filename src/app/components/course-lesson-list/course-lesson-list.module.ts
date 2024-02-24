import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { CourseLessonRoutingModule } from './course-lesson-list-routing.module';
import { CourseLessonListComponent } from './course-lesson-list.component';


@NgModule({
  declarations: [
    CourseLessonListComponent,
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
