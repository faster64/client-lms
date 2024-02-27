import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLessonResultComponent } from './course-lesson-result.component';

const routes: Routes = [
  {
    path: ':courseId/:lessonId',
    component: CourseLessonResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseLessonResultRoutingModule { }
