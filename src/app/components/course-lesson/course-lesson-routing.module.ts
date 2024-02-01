import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLessonComponent } from './course-lesson.component';
import { CourseLessonDetailComponent } from './course-lesson-detail/course-lesson-detail.component';

const routes: Routes = [
  {
    path: ':courseId',
    component: CourseLessonComponent
  },
  {
    path: ':courseId/:lessonId',
    component: CourseLessonDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLessonRoutingModule { }
