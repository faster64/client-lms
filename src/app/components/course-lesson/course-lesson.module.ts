import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseLessonRoutingModule } from './course-lesson-routing.module';
import { CourseLessonComponent } from './course-lesson.component';
import { CourseLessonDetailComponent } from './course-lesson-detail/course-lesson-detail.component';


@NgModule({
  declarations: [
    CourseLessonComponent,
    CourseLessonDetailComponent
  ],
  imports: [
    CommonModule,
    CourseLessonRoutingModule
  ]
})
export class CourseLessonModule { }
