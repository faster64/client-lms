import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseButtonModule } from 'src/app/shared/components/micro/button/button.module';
import { BaseLoadingModule } from 'src/app/shared/components/micro/loading/loading.module';
import { CourseLessonResultRoutingModule } from './course-lesson-result-routing.module';
import { CourseLessonResultComponent } from './course-lesson-result.component';


@NgModule({
  declarations: [
    CourseLessonResultComponent
  ],
  imports: [
    CommonModule,
    CourseLessonResultRoutingModule,
    BaseButtonModule,
    BaseLoadingModule
  ]
})
export class CourseLessonResultModule { }
