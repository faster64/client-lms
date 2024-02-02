import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLessonDetailComponent } from './course-lesson-detail/course-lesson-detail.component';
import { CourseLessonListComponent } from './course-lesson-list.component';

const routes: Routes = [
  {
    path: ':courseId',
    component: CourseLessonListComponent
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
