import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseLessonDetailComponent } from './course-lesson-detail/course-lesson-detail.component';
import { CourseLessonListComponent } from './course-lesson-list.component';
import { CourseLessonRoutingModule } from './course-lesson-list-routing.module';


@NgModule({
  declarations: [
    CourseLessonListComponent,
    CourseLessonDetailComponent
  ],
  imports: [
    CommonModule,
    CourseLessonRoutingModule
  ]
})
export class CourseLessonListModule { }
